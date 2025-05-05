using EducationSystem.Domain.DTOs;
using EducationSystem.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EducationSystem.Web.Controllers.Api
{
    [ApiController]
    [Authorize]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("me")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("profile")]
        public async Task<ActionResult<UserDTO>> UpdateProfile([FromBody] UserDTO userDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var updatedUser = await _userService.UpdateUserProfileAsync(userId, userDto);

            if (updatedUser == null)
            {
                return BadRequest("Failed to update profile");
            }

            return Ok(updatedUser);
        }
    }
}

