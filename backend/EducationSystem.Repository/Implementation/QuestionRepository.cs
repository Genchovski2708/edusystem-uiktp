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
    public class QuestionRepository : Repository<Question>, IQuestionRepository
    {
        public QuestionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<Question>> GetAllAsync()
        {
            return await _dbSet
                .Include(q => q.Answers)
                .ToListAsync();
        }

        public override async Task<Question> GetByIdAsync(Guid id)
        {
            return await _dbSet
                .Include(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == id);
        }
    }
}
