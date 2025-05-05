using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.Models
{
    public class Course : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        [ForeignKey("Author")]
        public Guid AuthorId { get; set; }
        public Author Author { get; set; }

        public ICollection<Quiz>? Quizzes { get; set; }
        public ICollection<MyCourses>? MyCourses { get; set; }
    }
}
