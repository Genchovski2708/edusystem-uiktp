using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System;
using System.Collections.Generic;

namespace EducationSystem.Domain.DTOs
{
    public class QuizDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public Guid CourseId { get; set; }
        public List<QuestionDTO> Questions { get; set; }
    }
}
