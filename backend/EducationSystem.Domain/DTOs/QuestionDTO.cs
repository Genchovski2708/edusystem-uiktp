using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.DTOs
{
    public class QuestionDTO
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid QuizId { get; set; }
        public List<AnswerDTO> Answers { get; set; }
    }
}