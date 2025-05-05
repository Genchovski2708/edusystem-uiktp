using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.Models
{
    public class UserQuizAttempt : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("CourseUser")]
        public string UserId { get; set; }
        public CourseUser CourseUser { get; set; }

        [ForeignKey("Quiz")]
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }

        public int Score { get; set; }
        public DateTime AttemptDate { get; set; }
    }
}
