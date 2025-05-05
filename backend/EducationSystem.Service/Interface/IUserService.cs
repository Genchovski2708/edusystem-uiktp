using EducationSystem.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Service.Interface
{
    public interface IUserService
    {
        Task<UserDTO> GetUserByIdAsync(string id);
        Task<UserDTO> UpdateUserProfileAsync(string id, UserDTO userDto);
    }
}
