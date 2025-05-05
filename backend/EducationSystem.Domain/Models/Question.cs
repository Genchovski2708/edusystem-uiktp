using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.Models
{
    public class Question : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string Text { get; set; }

        [ForeignKey("Quiz")]
        public Guid QuizId { get; set; }
        public Quiz Quiz { get; set; }

        public ICollection<Answer>? Answers { get; set; }
    }
}
