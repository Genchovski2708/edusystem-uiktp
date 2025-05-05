using AutoMapper;
using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interface;
using EducationSystem.Repository.Interfaces;
using EducationSystem.Service.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace EducationSystem.Service.Implementation
{
    public class QuizService : IQuizService
    {
        private readonly IQuizRepository _quizRepository;
        private readonly IUserQuizAttemptRepository _userQuizAttemptRepository;
        private readonly IQuestionRepository _questionRepository;
        private readonly IAnswerRepository _answerRepository;
        private readonly IMapper _mapper;

        public QuizService(
            IQuizRepository quizRepository,
            IUserQuizAttemptRepository userQuizAttemptRepository,
            IQuestionRepository questionRepository,
            IAnswerRepository answerRepository,
            IMapper mapper)
        {
            _quizRepository = quizRepository;
            _userQuizAttemptRepository = userQuizAttemptRepository;
            _questionRepository = questionRepository;
            _answerRepository = answerRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<QuizDTO>> GetQuizzesByCourseIdAsync(Guid courseId)
        {
            var quizzes = await _quizRepository.GetQuizzesByCourseIdAsync(courseId);
            return _mapper.Map<IEnumerable<QuizDTO>>(quizzes);
        }

        public async Task<QuizDTO> GetQuizByIdAsync(Guid id)
        {
            var quiz = await _quizRepository.GetQuizWithQuestionsAndAnswersAsync(id);
            return _mapper.Map<QuizDTO>(quiz);
        }

        public async Task<UserQuizAttemptDTO> SubmitQuizAttemptAsync(string userId, SolveQuizDto solveQuizDto)
        {
            // Get the quiz with questions and answers
            var quiz = await _quizRepository.GetQuizWithQuestionsAndAnswersAsync(solveQuizDto.QuizId);

            if (quiz == null)
            {
                return null;
            }

            int totalQuestions = quiz.Questions.Count();
            int correctAnswers = 0;

            // Check each answer
            foreach (var question in quiz.Questions)
            {
                if (solveQuizDto.Answers.TryGetValue(question.Id, out var selectedAnswerId))
                {
                    var isCorrect = question.Answers
                        .Any(a => a.Id == selectedAnswerId && a.IsCorrect);

                    if (isCorrect)
                    {
                        correctAnswers++;
                    }
                }
            }

            // Calculate score (percentage)
            int score = correctAnswers;

            // Create attempt record
            var attempt = new UserQuizAttempt
            {
                UserId = userId,
                QuizId = solveQuizDto.QuizId,
                Score = score,
                AttemptDate = DateTime.UtcNow
            };

            await _userQuizAttemptRepository.AddAsync(attempt);

            // Get the attempt with quiz details
            var savedAttempt = await _userQuizAttemptRepository.GetAttemptWithQuizDetailsAsync(attempt.Id);
            return _mapper.Map<UserQuizAttemptDTO>(savedAttempt);
        }

        public async Task<IEnumerable<UserQuizAttemptDTO>> GetUserQuizAttemptsAsync(string userId)
        {
            var attempts = await _userQuizAttemptRepository.GetUserAttemptsAsync(userId);
            return _mapper.Map<IEnumerable<UserQuizAttemptDTO>>(attempts);
        }
    }
}
