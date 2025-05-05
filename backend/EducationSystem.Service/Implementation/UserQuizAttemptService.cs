using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interface;
using EducationSystem.Service.Interface;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EducationSystem.Service.Implementation
{
    public class UserQuizAttemptService : IUserQuizAttemptService
    {
        private readonly IUserQuizAttemptRepository _userQuizAttemptRepository;

        public UserQuizAttemptService(IUserQuizAttemptRepository userQuizAttemptRepository)
        {
            _userQuizAttemptRepository = userQuizAttemptRepository;
        }

        public async Task<UserQuizAttempt> SubmitQuizAsync(string userId, Guid quizId, Dictionary<Guid, Guid> questionAnswerMap)
        {
            return await _userQuizAttemptRepository.SubmitQuizAsync(userId, quizId, questionAnswerMap);
        }

        public async Task<List<UserQuizAttempt>> GetUserAttemptsAsync(string userId)
        {
            var result = await _userQuizAttemptRepository.GetUserAttemptsAsync(userId);
            return result.ToList();
        }
    }
}
