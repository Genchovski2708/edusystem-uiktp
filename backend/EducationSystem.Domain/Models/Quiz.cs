using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.Models
{
    public class Quiz : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }

        [ForeignKey("Course")]
        public Guid CourseId { get; set; }
        public Course Course { get; set; }

        public ICollection<Question>? Questions { get; set; }
        public ICollection<UserQuizAttempt>? UserQuizAttempts { get; set; }

    }
}
