using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using System.Data;
using System.Data.SqlClient;
using System.Text.RegularExpressions;

namespace EduFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersManagmentController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public UsersManagmentController(DataContext context)
        {
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Authorize(Roles = "Admin")]
        [Route("UpsertUsers")]
        [HttpPost]
        public async Task <IActionResult> UpsertUsers([FromBody]User user)
        {
            bool saved = false;
            bool updated = false;
            int id = Convert.ToInt32(user.UserID);
            try
            {
                //insert doctors accounts
                await conn.OpenAsync();
                if (id == 0)
                {
                    string inserUser = @"insert into Users (AcademicID,UserName,Email,Password,Role) values
                                       (@AcademicID,@UserName,@Email,@Password,@Role)select SCOPE_IDENTITY()";
                    string hashPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
                    using(SqlCommand cmd=new SqlCommand(inserUser, conn))
                    {
                        cmd.Parameters.AddWithValue("@AcademicID", user.AcademicID);
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@Password", hashPassword);
                        cmd.Parameters.AddWithValue("@Role", user.Role);
                        id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                        saved = true;
                    }
                }
                else
                {
                    bool updatePassword = !string.IsNullOrEmpty(user.Password);
                    string updateQuery = $@"update Users set 
                                          UserName=@UserName, 
                                          Email=@Email 
                                          {(user.Role == "Student" ? ", AcademicID=@AcademicID" : "")}
                                          {(updatePassword ? ", Password=@Password" : "")} 
                                          where UserID=@UserID";
                    using (SqlCommand cmd = new SqlCommand(updateQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@UserID", id);

                        if (user.Role == "Student")
                        cmd.Parameters.AddWithValue("@AcademicID", user.AcademicID);
                        if (updatePassword)
                        {
                            string hashedP = BCrypt.Net.BCrypt.EnhancedHashPassword(user.Password);
                            cmd.Parameters.AddWithValue("@Password", hashedP);
                        }
                        await cmd.ExecuteNonQueryAsync();
                        updated = true;
                    }
                }
                await conn.CloseAsync();
                return Ok(new { id = id , saved=saved , updated=updated});
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }
          
        }

        [Authorize(Roles = "Admin")]
        [Route("GetAllUsers")]
        [HttpPost]
        public async Task <IActionResult> GetAllUsers(int pageNumber,int pageSize )
        {
            DataTable dt = new DataTable();
            int offset = (pageNumber - 1) * pageSize;
            int totalCount = 0;
            string getUser = @"select UserID,AcademicID,UserName,Email,Role from Users order by UserID  
                               offset @offset rows fetch next @pageSize rows only";
            string countQuery = "SELECT COUNT(*) FROM Users";

            using (SqlCommand cmd = new SqlCommand(getUser, conn))
            {
                cmd.Parameters.AddWithValue("@offset", offset);
                cmd.Parameters.AddWithValue("@pageSize", pageSize);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            using (SqlCommand cmdCount = new SqlCommand(countQuery, conn))
            {
                if (conn.State != ConnectionState.Open) await conn.OpenAsync();
                totalCount = (int)await cmdCount.ExecuteScalarAsync();
            }
            return Ok(new
            {
                users = dt,
                totalCount = totalCount
            });
        }

        [Authorize(Roles = "Admin")]
        [Route("DeleteUsers")]
        [HttpDelete]
        public async Task<IActionResult> DeleteUsers(int userId)
        {
            bool deleted = false;
            try
            {
                if (userId > 0)
                {
                    await conn.OpenAsync();
                    string deleteQuery = @"delete Users where UserID=@UserID";
                    using(SqlCommand cmd=new SqlCommand(deleteQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserID", userId);
                        await cmd.ExecuteNonQueryAsync();
                    }
                     await conn.CloseAsync();
                }
                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error =ex.Message,deleted = true });
            }
        }
    }
}
