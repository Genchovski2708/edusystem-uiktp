using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using System;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EducationSystem.Service.Interface
{
    public interface IQuizService
    {
        Task<IEnumerable<QuizDTO>> GetQuizzesByCourseIdAsync(Guid courseId);
        Task<QuizDTO> GetQuizByIdAsync(Guid id);
        Task<UserQuizAttemptDTO> SubmitQuizAttemptAsync(string userId, SolveQuizDto solveQuizDto);
        Task<IEnumerable<UserQuizAttemptDTO>> GetUserQuizAttemptsAsync(string userId);
    }
}
