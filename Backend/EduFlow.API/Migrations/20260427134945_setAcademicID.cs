using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduFlow.API.Migrations
{
    /// <inheritdoc />
    public partial class setAcademicID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AcademicID",
                table: "Users",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcademicID",
                table: "Users");
        }
    }
}
