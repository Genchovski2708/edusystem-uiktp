using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICourseService
{
    Task<IEnumerable<CourseDTO>> GetAllCoursesAsync();
    Task<CourseDTO> GetCourseByIdAsync(Guid id);
    Task<IEnumerable<CourseDTO>> GetUserCoursesAsync(string userId);
    Task<bool> EnrollUserInCourseAsync(string userId, Guid courseId);
}
