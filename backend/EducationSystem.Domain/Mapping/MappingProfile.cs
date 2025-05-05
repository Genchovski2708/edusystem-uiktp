using EducationSystem.Domain.DTOs;
using EducationSystem.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using AutoMapper;

namespace EducationSystem.Domain.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Author mappings
            CreateMap<Author, AuthorDTO>();
            CreateMap<AuthorDTO, Author>();

            // Course mappings
            CreateMap<Course, CourseDTO>()
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author));
            CreateMap<CourseDTO, Course>();

            // Answer mappings
            CreateMap<Answer, AnswerDTO>();
            CreateMap<AnswerDTO, Answer>();

            // Question mappings
            CreateMap<Question, QuestionDTO>()
                .ForMember(dest => dest.Answers, opt => opt.MapFrom(src => src.Answers));
            CreateMap<QuestionDTO, Question>();

            // Quiz mappings
            CreateMap<Quiz, QuizDTO>()
                .ForMember(dest => dest.Questions, opt => opt.MapFrom(src => src.Questions));
            CreateMap<QuizDTO, Quiz>();

            // MyCourses mappings
            CreateMap<MyCourses, MyCoursesDTO>()
                .ForMember(dest => dest.Course, opt => opt.MapFrom(src => src.Course));
            CreateMap<MyCoursesDTO, MyCourses>();

            // User mappings
            CreateMap<CourseUser, UserDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id));
            CreateMap<UserDTO, CourseUser>();

            // UserQuizAttempt mappings
            CreateMap<UserQuizAttempt, UserQuizAttemptDTO>()
                .ForMember(dest => dest.Quiz, opt => opt.MapFrom(src => src.Quiz))
                .ForMember(dest => dest.TotalQuestions, opt => opt.MapFrom(src => src.Quiz.Questions.Count()));
            CreateMap<UserQuizAttemptDTO, UserQuizAttempt>();
        }
    }
}
