using EducationSystem.Domain.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EducationSystem.Web.Controllers.Api
{
    [ApiController]
    [Route("api/courses")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDTO>> GetCourse(Guid id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);

            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [Authorize]
        [HttpGet("my-courses")]
        public async Task<ActionResult<IEnumerable<CourseDTO>>> GetUserCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var courses = await _courseService.GetUserCoursesAsync(userId);
            return Ok(courses);
        }

        [Authorize]
        [HttpPost("enroll")]
        public async Task<ActionResult> EnrollInCourse([FromBody] EnrollRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await _courseService.EnrollUserInCourseAsync(userId, request.CourseId);

            if (!result)
            {
                return BadRequest("Failed to enroll in course. You may already be enrolled.");
            }

            return Ok();
        }
    }
}
