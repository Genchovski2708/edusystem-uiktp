using AutoMapper;
using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using EducationSystem.Repository.Interface;
using EducationSystem.Repository.Interfaces;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;
    private readonly IMyCoursesRepository _myCoursesRepository;
    private readonly IMapper _mapper;

    public CourseService(
        ICourseRepository courseRepository,
        IMyCoursesRepository myCoursesRepository,
        IMapper mapper)
    {
        _courseRepository = courseRepository;
        _myCoursesRepository = myCoursesRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CourseDTO>> GetAllCoursesAsync()
    {
        var courses = await _courseRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CourseDTO>>(courses);
    }

    public async Task<CourseDTO> GetCourseByIdAsync(Guid id)
    {
        var course = await _courseRepository.GetCourseWithDetailsAsync(id);
        return _mapper.Map<CourseDTO>(course);
    }

    public async Task<IEnumerable<CourseDTO>> GetUserCoursesAsync(string userId)
    {
        var myCourses = await _myCoursesRepository.GetUserCoursesWithDetailsAsync(userId);
        var courses = myCourses.Select(mc => mc.Course);
        return _mapper.Map<IEnumerable<CourseDTO>>(courses);
    }

    public async Task<bool> EnrollUserInCourseAsync(string userId, Guid courseId)
    {
        // Check if already enrolled
        var isEnrolled = await _myCoursesRepository.IsUserEnrolledInCourseAsync(userId, courseId);
        if (isEnrolled)
        {
            return false;
        }

        // Check if course exists
        var course = await _courseRepository.GetByIdAsync(courseId);
        if (course == null)
        {
            return false;
        }

        // Enroll
        var myCourse = new MyCourses
        {
            UserId = userId,
            CourseId = courseId,
            AddedOn = DateTime.UtcNow
        };

        await _myCoursesRepository.AddAsync(myCourse);
        return true;
    }
}
