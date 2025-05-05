using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interface;
using EducationSystem.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationSystem.Repository.Implementation
{
    public class UserQuizAttemptRepository : Repository<UserQuizAttempt>, IUserQuizAttemptRepository
    {
        public UserQuizAttemptRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<UserQuizAttempt>> GetUserAttemptsAsync(string userId)
        {
            return await _dbSet
                .Where(ua => ua.UserId == userId)
                .Include(ua => ua.Quiz)
                .ThenInclude(q => q.Course)
                .Include(ua => ua.Quiz)
                .ThenInclude(q => q.Questions)
                .ToListAsync();
        }

        public async Task<UserQuizAttempt> GetAttemptWithQuizDetailsAsync(Guid id)
        {
            return await _dbSet
                .Include(ua => ua.Quiz)
                .ThenInclude(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(ua => ua.Id == id);
        }
        public async Task<UserQuizAttempt> SubmitQuizAsync(string userId, Guid quizId, Dictionary<Guid, Guid> questionAnswerMap)
        {
            // Fetch quiz with questions and answers
            var quiz = await _context.Quizzes
                .Include(q => q.Questions)
                .ThenInclude(q => q.Answers)
                .FirstOrDefaultAsync(q => q.Id == quizId);

            if (quiz == null || quiz.Questions == null)
                return null;

            int score = 0;

            foreach (var question in quiz.Questions)
            {
                if (questionAnswerMap.TryGetValue(question.Id, out Guid selectedAnswerId))
                {
                    var correctAnswer = question.Answers.FirstOrDefault(a => a.IsCorrect);
                    if (correctAnswer != null && correctAnswer.Id == selectedAnswerId)
                    {
                        score++;
                    }
                }
            }

            var attempt = new UserQuizAttempt
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                QuizId = quizId,
                Score = score,
                AttemptDate = DateTime.UtcNow
            };

            await _dbSet.AddAsync(attempt);
            await _context.SaveChangesAsync();

            return attempt;
        }
    }
}
