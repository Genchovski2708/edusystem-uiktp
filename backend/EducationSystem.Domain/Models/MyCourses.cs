using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.Models
{
    public class MyCourses : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("CourseUser")]
        public string UserId { get; set; }
        public CourseUser CourseUser { get; set; }

        [ForeignKey("Course")]
        public Guid CourseId { get; set; }
        public Course Course { get; set; }

        public DateTime AddedOn { get; set; } = DateTime.UtcNow;
    }
}
