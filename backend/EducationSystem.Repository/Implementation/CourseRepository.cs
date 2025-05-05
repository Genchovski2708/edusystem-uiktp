using System;
using EducationSystem.Domain.Models;
using EducationSystem.Repository;
using Microsoft.EntityFrameworkCore;

public class CourseRepository : Repository<Course>, ICourseRepository
{
    public CourseRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Course>> GetCoursesByUserIdAsync(string userId)
    {
        return await _context.MyCourses
            .Where(mc => mc.UserId == userId)
            .Include(mc => mc.Course)
            .ThenInclude(c => c.Author)
            .Select(mc => mc.Course)
            .ToListAsync();
    }

    public async Task<Course> GetCourseWithDetailsAsync(Guid id)
    {
        return await _dbSet
            .Include(c => c.Author)
            .FirstOrDefaultAsync(c => c.Id == id);
    }

    public override async Task<IEnumerable<Course>> GetAllAsync()
    {
        return await _dbSet
            .Include(c => c.Author)
            .ToListAsync();
    }
}

