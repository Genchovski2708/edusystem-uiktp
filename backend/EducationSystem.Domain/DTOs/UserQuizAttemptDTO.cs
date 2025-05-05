using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.DTOs
{
    public class UserQuizAttemptDTO
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid QuizId { get; set; }
        public QuizDTO Quiz { get; set; }
        public int Score { get; set; }
        public DateTime AttemptDate { get; set; }
        public int TotalQuestions { get; set; }
    }
}