using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Repository.Implementation
{
    public class MyCoursesRepository : Repository<MyCourses>, IMyCoursesRepository
    {
        public MyCoursesRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<MyCourses>> GetUserCoursesWithDetailsAsync(string userId)
        {
            return await _dbSet
                .Where(mc => mc.UserId == userId)
                .Include(mc => mc.Course)
                .ThenInclude(c => c.Author)
                .ToListAsync();
        }

        public async Task<bool> IsUserEnrolledInCourseAsync(string userId, Guid courseId)
        {
            return await _dbSet.AnyAsync(mc => mc.UserId == userId && mc.CourseId == courseId);
        }
    }
}
