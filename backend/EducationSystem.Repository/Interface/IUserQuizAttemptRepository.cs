using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interfaces;

namespace EducationSystem.Repository.Interface
{
    public interface IUserQuizAttemptRepository : IRepository<UserQuizAttempt>
    {
        Task<IEnumerable<UserQuizAttempt>> GetUserAttemptsAsync(string userId);
        Task<UserQuizAttempt> GetAttemptWithQuizDetailsAsync(Guid id);
        Task<UserQuizAttempt> SubmitQuizAsync(string userId, Guid quizId, Dictionary<Guid, Guid> questionAnswerMap);
    }
}
