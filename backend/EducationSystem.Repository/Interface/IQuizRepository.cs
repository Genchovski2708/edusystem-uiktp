using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Repository.Interface
{
    public interface IQuizRepository : IRepository<Quiz>
    {
        Task<IEnumerable<Quiz>> GetQuizzesByCourseIdAsync(Guid courseId);
        Task<Quiz> GetQuizWithQuestionsAndAnswersAsync(Guid id);
    }
}
