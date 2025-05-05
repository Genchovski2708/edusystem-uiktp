using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Domain.DTOs
{
    public class MyCoursesDTO
    {
        public Guid Id { get; set; }
        public string UserId { get; set; }
        public Guid CourseId { get; set; }
        public CourseDTO Course { get; set; }
        public DateTime AddedOn { get; set; }
    }
}
