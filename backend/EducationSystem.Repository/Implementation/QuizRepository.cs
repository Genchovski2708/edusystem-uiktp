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
    public class QuizRepository : Repository<Quiz>, IQuizRepository
    {
        public QuizRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Quiz>> GetQuizzesByCourseIdAsync(Guid courseId)
        {
            return await _dbSet
                .Where(q => q.CourseId == courseId)
                .ToListAsync();
        }

        public async Task<Quiz> GetQuizWithQuestionsAndAnswersAsync(Guid id)
        {
            return await _dbSet
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
