
using System.ComponentModel.DataAnnotations;

    public class User
    {
         [Key]
         public int UserID { get; set; }
         [Required] 
         public string UserName { get; set; }
         [Required]
         [EmailAddress]
         public string Email { get; set; }
         [Required]
         [MinLength(5)]
         public string Password { get; set; }
         [Required]
         public string Role { get; set; }// "Admin", "Doctor", "Student"

}

