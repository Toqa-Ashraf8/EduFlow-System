
using Microsoft.EntityFrameworkCore;

    public class DataContext:DbContext
    {
      public DataContext(DbContextOptions<DataContext> options) : base(options) { }
         public DbSet<User>Users { get; set; }
         public DbSet<Course> Courses { get; set; }




    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>().OwnsOne(c => c.Instructors);
        modelBuilder.Entity<Course>().OwnsOne(c => c.Schedule);
        //modelBuilder.Entity<Instructors>().HasNoKey();
        //modelBuilder.Entity<Schedule>().HasNoKey();
        base.OnModelCreating(modelBuilder);
    }
   

    }

