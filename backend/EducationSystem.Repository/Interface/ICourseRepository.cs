using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ICourseRepository : IRepository<Course>
{
    Task<IEnumerable<Course>> GetCoursesByUserIdAsync(string userId);
    Task<Course> GetCourseWithDetailsAsync(Guid id);
}
