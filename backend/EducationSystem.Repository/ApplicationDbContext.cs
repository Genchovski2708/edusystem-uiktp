using EducationSystem.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EducationSystem.Repository
{
    public class ApplicationDbContext : IdentityDbContext<CourseUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<MyCourses> MyCourses { get; set; }
        public DbSet<UserQuizAttempt> UserQuizAttempts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Author)
                .WithMany(a => a.Courses)
                .HasForeignKey(c => c.AuthorId);

            modelBuilder.Entity<Quiz>()
                .HasOne(q => q.Course)
                .WithMany(c => c.Quizzes)
                .HasForeignKey(q => q.CourseId);

            modelBuilder.Entity<Question>()
                .HasOne(q => q.Quiz)
                .WithMany(q => q.Questions)
                .HasForeignKey(q => q.QuizId);

            modelBuilder.Entity<Answer>()
                .HasOne(a => a.Question)
                .WithMany(q => q.Answers)
                .HasForeignKey(a => a.QuestionId);

            modelBuilder.Entity<MyCourses>()
                .HasOne(mc => mc.CourseUser)
                .WithMany(u => u.MyCourses)
                .HasForeignKey(mc => mc.UserId);

            modelBuilder.Entity<MyCourses>()
                .HasOne(mc => mc.Course)
                .WithMany(c => c.MyCourses)
                .HasForeignKey(mc => mc.CourseId);

            modelBuilder.Entity<UserQuizAttempt>()
                .HasOne(ua => ua.CourseUser)
                .WithMany(u => u.UserQuizAttempts)
                .HasForeignKey(ua => ua.UserId);

            modelBuilder.Entity<UserQuizAttempt>()
                .HasOne(ua => ua.Quiz)
                .WithMany(q => q.UserQuizAttempts)
                .HasForeignKey(ua => ua.QuizId);
        }
    }
}
