using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using EducationSystem.Domain.DTOs;
using EducationSystem.Service.Interface;
using System.Security.Claims;

namespace EducationSystem.Web.Controllers.Api
{
    [ApiController]
    [Route("api")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet("courses/{courseId}/quizzes")]
        public async Task<ActionResult<IEnumerable<QuizDTO>>> GetQuizzesByCourse(Guid courseId)
        {
            var quizzes = await _quizService.GetQuizzesByCourseIdAsync(courseId);
            return Ok(quizzes);
        }

        [HttpGet("quizzes/{id}")]
        public async Task<ActionResult<QuizDTO>> GetQuiz(Guid id)
        {
            var quiz = await _quizService.GetQuizByIdAsync(id);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        [Authorize]
        [HttpPost("quizzes/{id}/submit")]
        public async Task<ActionResult<UserQuizAttemptDTO>> SubmitQuiz(Guid id, [FromBody] SolveQuizDto solveQuizDto)
        {
            if (id != solveQuizDto.QuizId)
            {
                return BadRequest("Quiz ID mismatch");
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var attempt = await _quizService.SubmitQuizAttemptAsync(userId, solveQuizDto);

            if (attempt == null)
            {
                return BadRequest("Failed to submit quiz attempt");
            }

            return Ok(attempt);
        }

        [Authorize]
        [HttpGet("quiz-attempts")]
        public async Task<ActionResult<IEnumerable<UserQuizAttemptDTO>>> GetUserQuizAttempts()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var attempts = await _quizService.GetUserQuizAttemptsAsync(userId);
            return Ok(attempts);
        }
    }
}
