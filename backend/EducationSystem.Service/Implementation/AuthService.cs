using AutoMapper;
using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using EducationSystem.Service.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Service.Implementation
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<CourseUser> _userManager;
        private readonly SignInManager<CourseUser> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;

        public AuthService(
            UserManager<CourseUser> userManager,
            SignInManager<CourseUser> signInManager,
            IJwtService jwtService,
            IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _mapper = mapper;
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null)
            {
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginRequest.Password, false);

            if (!result.Succeeded)
            {
                return null;
            }

            var token = _jwtService.GenerateToken(user);
            var userDto = _mapper.Map<UserDTO>(user);

            return new AuthResponse
            {
                Token = token,
                User = userDto
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest registerRequest)
        {
            if (registerRequest.Password != registerRequest.ConfirmPassword)
            {
                return null;
            }

            var existingUser = await _userManager.FindByEmailAsync(registerRequest.Email);
            if (existingUser != null)
            {
                return null;
            }

            var user = new CourseUser
            {
                Email = registerRequest.Email,
                UserName = registerRequest.UserName,
                FirstName = registerRequest.FirstName,
                LastName = registerRequest.LastName
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            if (!result.Succeeded)
            {
                return null;
            }

            var token = _jwtService.GenerateToken(user);
            var userDto = _mapper.Map<UserDTO>(user);

            return new AuthResponse
            {
                Token = token,
                User = userDto
            };
        }
    }
}
