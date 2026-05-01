using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace EduFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesManagementController : ControllerBase
    {
        private readonly DataContext _context;
        SqlConnection conn;
        public CoursesManagementController(DataContext context)
        {
            _context = context;
            conn = new SqlConnection(_context.Database.GetConnectionString());
        }
        [Authorize(Roles = "Admin")]
        [Route("UpsertCourses")]
        [HttpPost]
        public async Task<IActionResult> UpsertCourses([FromBody] Course course)
        {
            bool saved = false;
            bool updated = false;
            int id = Convert.ToInt32(course.Serial);
            try
            {
                await conn.OpenAsync();
                if (id == 0)
                {
                    string inserCourse = @"insert into Courses (CourseCode,CourseName,MaxStudents,PrimaryDoctor,Assistant1,Assistant2,Days,Lectures) 
                                           values
                                          (@CourseCode,@CourseName,@MaxStudents,@PrimaryDoctor,@Assistant1,@Assistant2,@Days,@Lectures)
                                          select SCOPE_IDENTITY()";
                    using (SqlCommand cmd = new SqlCommand(inserCourse, conn))
                    {
                        cmd.Parameters.AddWithValue("@CourseCode", course.CourseCode);
                        cmd.Parameters.AddWithValue("@CourseName", course.CourseName);
                        cmd.Parameters.AddWithValue("@MaxStudents", course.MaxStudents);
                        cmd.Parameters.AddWithValue("@PrimaryDoctor", course.Instructors.PrimaryDoctor);
                        cmd.Parameters.AddWithValue("@Assistant1", course.Instructors.Assistant1);
                        cmd.Parameters.AddWithValue("@Assistant2", course.Instructors.Assistant2);
                        cmd.Parameters.AddWithValue("@Days", course.Schedule.Days);
                        cmd.Parameters.AddWithValue("@Lectures", course.Schedule.Lectures);
                        id = Convert.ToInt32(await cmd.ExecuteScalarAsync());
                        saved = true;
                    }
                }
                else
                {
                    string updateQuery = @"update Courses set CourseCode=@CourseCode,CourseName=@CourseName, MaxStudents=@MaxStudents,
                                           PrimaryDoctor=@PrimaryDoctor,Assistant1=@Assistant1,Assistant2=@Assistant2,Days=@Days,Lectures=@Lectures
                                           where Serial=@Serial";
                    using (SqlCommand cmd = new SqlCommand(updateQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@CourseCode", course.CourseCode);
                        cmd.Parameters.AddWithValue("@CourseName", course.CourseName);
                        cmd.Parameters.AddWithValue("@MaxStudents", course.MaxStudents);
                        cmd.Parameters.AddWithValue("@Serial", id);
                        cmd.Parameters.AddWithValue("@PrimaryDoctor", course.Instructors.PrimaryDoctor);
                        cmd.Parameters.AddWithValue("@Assistant1", course.Instructors.Assistant1);
                        cmd.Parameters.AddWithValue("@Assistant2", course.Instructors.Assistant2);
                        cmd.Parameters.AddWithValue("@Days", course.Schedule.Days);
                        cmd.Parameters.AddWithValue("@Lectures", course.Schedule.Lectures);
                        await cmd.ExecuteNonQueryAsync();
                        updated = true;
                    }
                }
                await conn.CloseAsync();
                return Ok(new { id = id, saved = saved, updated = updated });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, saved = false, updated = false });
            }

        }

        [Authorize(Roles = "Admin")]
        [Route("GetAllCourses")]
        [HttpPost]
        public async Task<IActionResult> GetAllCourses(int pageNumber, int pageSize)
        {
            DataTable dt = new DataTable();
            int offset = (pageNumber - 1) * pageSize;
            int totalCount = 0;
            string getCourse = @"select Serial,CourseCode,CourseName,MaxStudents,PrimaryDoctor,Assistant1,Assistant2,
                                Days,Lectures from Courses order by Serial 
                                offset @offset rows fetch next @pageSize rows only";

            string countAll = "SELECT COUNT(*) FROM Courses";
            if (conn.State != ConnectionState.Open) await conn.OpenAsync();
            using (SqlCommand cmd = new SqlCommand(getCourse, conn))
            {
                cmd.Parameters.AddWithValue("@offset", offset);
                cmd.Parameters.AddWithValue("@pageSize", pageSize);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
            using (SqlCommand cmdCount = new SqlCommand(countAll, conn))
            {
                totalCount = (int)await cmdCount.ExecuteScalarAsync();
            }
           
            if (conn.State != ConnectionState.Closed) await conn.CloseAsync();
            return Ok(new
            {
                courses = dt,
                totalCount = totalCount,
             
            });
        }

        [Authorize(Roles = "Admin")]
        [Route("DeleteCourses")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCourses(int courseId)
        {
            bool deleted = false;
            try
            {
                if (courseId > 0)
                {
                    await conn.OpenAsync();
                    string deleteQuery = @"delete Courses where Serial=@Serial";
                    using (SqlCommand cmd = new SqlCommand(deleteQuery, conn))
                    {
                        cmd.Parameters.AddWithValue("@Serial", courseId);
                        await cmd.ExecuteNonQueryAsync();
                    }
                    await conn.CloseAsync();
                }
                return Ok(new { deleted = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, deleted = true });
            }
        }


    }
}
