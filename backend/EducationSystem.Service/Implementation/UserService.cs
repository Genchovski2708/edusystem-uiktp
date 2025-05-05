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
    public class UserService : IUserService
    {
        private readonly UserManager<CourseUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<CourseUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<UserDTO> GetUserByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            return _mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> UpdateUserProfileAsync(string id, UserDTO userDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return null;
            }

            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.UserName = userDto.UserName;

            // Email change requires more validation and potentially confirmation
            // Not included here for simplicity

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded)
            {
                return _mapper.Map<UserDTO>(user);
            }

            return null;
        }
    }
}
