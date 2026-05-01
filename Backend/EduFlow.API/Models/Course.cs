
using System.ComponentModel.DataAnnotations;
using System.Globalization;

public class Course
{
    [Key]
    public int Serial { get; set; }
    [Required]
    public string CourseCode { get; set; }
    [Required]
    public string CourseName { get; set; }
    [Required]
    public int MaxStudents { get; set; }
    //Objects
    public Instructors Instructors { get; set; } = new Instructors();
    public Schedule Schedule { get; set; } = new Schedule();

   }
//Arrays
//public List<Instructors> Instructors { get; set; }
//public List<Schedule> Schedule { get; set; }

public class Instructors
{
    public string? PrimaryDoctor { get; set; }
    public string? Assistant1 { get; set; }
    public string? Assistant2 { get; set; }
}
public class Schedule
{
    public string? Days { get; set; }
    public string? Lectures { get; set; }
}
   

