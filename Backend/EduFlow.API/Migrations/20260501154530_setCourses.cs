using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduFlow.API.Migrations
{
    /// <inheritdoc />
    public partial class setCourses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Serial = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaxStudents = table.Column<int>(type: "int", nullable: false),
                    PrimaryDoctor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Assistant1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Assistant2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Days = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lectures = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Serial);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Courses");
        }
    }
}
