//// EducationSystem.API/Controllers/CoursesController.cs
//using EducationSystem.Domain.DTOs;
//using EducationSystem.Service.Interface;
//using EducationSystem.Service.Mappers;
//using Microsoft.AspNetCore.Mvc;

//namespace EducationSystem.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CoursesController : ControllerBase
//    {
//        private readonly ICourseService _courseService;

//        public CoursesController(ICourseService courseService)
//        {
//            _courseService = courseService;
//        }

//        // GET: api/courses
//        [HttpGet]
//        public async Task<ActionResult<List<CourseDTO>>> GetAllCourses()
//        {
//            var courses = await _courseService.GetAllCoursesWithAuthors();
//            return Ok(courses.ToDTO()); // Use the extension method to convert to DTOs
//        }

//        // GET: api/courses/{id}
//        [HttpGet("{id}")]
//        public async Task<ActionResult<CourseDTO>> GetCourseById(Guid id)
//        {
//            var course = await _courseService.GetCourseById(id);
//            if (course == null)
//            {
//                return NotFound();
//            }
//            return Ok(course.ToDTO());
//        }

//        // GET: api/courses/my-courses
//        [HttpGet("my-courses")]
//        public async Task<ActionResult<List<CourseDTO>>> GetUserCourses()
//        {
//            // You'll need to implement this based on your authentication setup
//            string userId = User.Identity?.Name; // Or however you get the current user ID

//            if (string.IsNullOrEmpty(userId))
//            {
//                return Unauthorized();
//            }

//            var courses = await _courseService.GetUserCourses(userId);
//            return Ok(courses.ToDTO());
//        }

//        // POST: api/courses/enroll
//        [HttpPost("enroll")]
//        public async Task<IActionResult> EnrollInCourse([FromBody] EnrollmentRequest request)
//        {
//            if (request == null || request.CourseId == Guid.Empty)
//            {
//                return BadRequest("Invalid course ID");
//            }

//            string userId = User.Identity?.Name; // Or however you get the current user ID

//            if (string.IsNullOrEmpty(userId))
//            {
//                return Unauthorized();
//            }

//            var result = await _courseService.EnrollUserInCourse(userId, request.CourseId);
//            if (!result)
//            {
//                return BadRequest("Failed to enroll in course");
//            }

//            return Ok(new { success = true });
//        }
//    }

//    public class EnrollmentRequest
//    {
//        public Guid CourseId { get; set; }
//    }
//}