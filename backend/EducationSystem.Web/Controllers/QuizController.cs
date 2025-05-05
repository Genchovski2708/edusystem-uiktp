//using EducationSystem.Domain.DTOs;
//using EducationSystem.Service.Interface;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace EducationSystem.Web.Controllers
//{
//    [Authorize]
//    public class QuizController : Controller
//    {
//        private readonly IQuizService _quizService;
//        private readonly IUserQuizAttemptService _userQuizAttemptService;

//        public QuizController(IQuizService quizService, IUserQuizAttemptService userQuizAttemptService)
//        {
//            _quizService = quizService;
//            _userQuizAttemptService = userQuizAttemptService;
//        }

//        public async Task<IActionResult> Solve(Guid id)
//        {
//            var quiz = await _quizService.GetQuizWithQuestionsAsync(id);
//            return View(quiz);
//        }

//        [HttpPost]
//        public async Task<IActionResult> Submit(SolveQuizDto model)
//        {
//            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
//            var result = await _userQuizAttemptService.SubmitQuizAsync(userId, model.QuizId, model.Answers);
//            return RedirectToAction("Result", new { id = result.Id });
//        }

//        public async Task<IActionResult> Result(Guid id)
//        {
//            var attempt = await _userQuizAttemptService.GetUserAttemptsAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
//            var thisAttempt = attempt.Find(x => x.Id == id);
//            return View(thisAttempt);
//        }
//    }
//}
