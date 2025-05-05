using EducationSystem.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EducationSystem.Service.Interface
{
    public interface IUserQuizAttemptService
    {
        Task<UserQuizAttempt> SubmitQuizAsync(string userId, Guid quizId, Dictionary<Guid, Guid> questionAnswerMap);
        Task<List<UserQuizAttempt>> GetUserAttemptsAsync(string userId);
    }
}
