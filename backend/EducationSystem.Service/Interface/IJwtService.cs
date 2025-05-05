using EducationSystem.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EducationSystem.Service.Interface
{
    public interface IJwtService
    {
        string GenerateToken(CourseUser user);
    }
}
