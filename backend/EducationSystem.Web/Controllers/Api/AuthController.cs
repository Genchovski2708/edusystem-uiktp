using EducationSystem.Domain.DTOs;
using EducationSystem.Service.Interface;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace EducationSystem.Web.Controllers.Api
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] Domain.DTOs.LoginRequest loginRequest)
        {
            var response = await _authService.LoginAsync(loginRequest);

            if (response == null)
            {
                return Unauthorized("Invalid login credentials");
            }

            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] Domain.DTOs.RegisterRequest registerRequest)
        {
            try
            {
                Console.WriteLine($"Register attempt for: {registerRequest.Email}");
                Console.WriteLine($"Data received: {JsonSerializer.Serialize(registerRequest)}");

                var response = await _authService.RegisterAsync(registerRequest);

                if (response == null)
                {
                    Console.WriteLine("Registration failed (null response)");
                    return BadRequest("Registration failed");
                }

                Console.WriteLine("Registration successful");
                return Ok(response);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Registration error: {ex}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
