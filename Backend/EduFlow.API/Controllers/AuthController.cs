using BCrypt.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;

namespace EduFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly JwtSettings _jwt;
        SqlConnection conn;
        public AuthController(IOptions<JwtSettings> jwt,DataContext context)
        {
            _jwt = jwt.Value;
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Route("Register")]
        [HttpPost]
        public async Task <IActionResult> Register([FromBody]User user)
        {
            bool isExisted = false;
            string assignedRole = "Student";
            int id = Convert.ToInt32(user.UserID);
            await conn.OpenAsync();
            using (SqlTransaction transaction = conn.BeginTransaction())
            {
                try
                {
                    DataTable dt = new DataTable();
                    string search = @"select Email from Users where Email=@Email";
                    using (SqlCommand cmd = new SqlCommand(search, conn, transaction))
                    {
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        int count = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                        if (count > 0)
                        {
                            return BadRequest(new { isExisted = true, error = "User is already existed" });
                        }
                    }
                        string hashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
                        string insertUser = @"insert into Users (UserName,Email,Password,Role) values
                                             (@UserName,@Email,@Password,@Role)select SCOPE_IDENTITY()";
                        using(SqlCommand cmd=new SqlCommand(insertUser, conn, transaction))
                        {
                            cmd.Parameters.AddWithValue("@UserName", user.UserName);
                            cmd.Parameters.AddWithValue("@Email", user.Email);
                            cmd.Parameters.AddWithValue("@Password", hashPassword);
                            cmd.Parameters.AddWithValue("@Role", assignedRole);
                            id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                        }
                        var claims = new[]
                        {
                            new Claim(ClaimTypes.Name, user.UserName),
                            new Claim(ClaimTypes.Role, user.Role),
                         };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SecretKey));
                        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: "MyEduFlowApi",
                            audience: "MyEduFlowApp",
                            claims: claims,
                            expires: DateTime.Now.AddHours(2),
                            signingCredentials: creds
                        );
                        await transaction.CommitAsync();
                        var data = new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            user = new
                            {
                                UserID=id,
                                user.UserName,
                                user.Email,
                                Role= assignedRole
                            },
                             isExisted = false
                        };
                        return Ok(data);
                }
                catch (Exception)
                {
                    await transaction.RollbackAsync();
                    return StatusCode(500, "Internal Server Error");
                }
                finally
                {
                    await conn.CloseAsync();
                }
               
            }

        }
    }
}
