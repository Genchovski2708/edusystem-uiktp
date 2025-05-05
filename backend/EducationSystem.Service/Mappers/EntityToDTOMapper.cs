using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EducationSystem.Domain.Models;
using EducationSystem.Domain.DTOs;

namespace EducationSystem.Service.Mappers
{
    public static class EntityToDTOMapper
    {
        public static CourseDTO ToDTO(this Course course)
        {
            if (course == null) return null;

            return new CourseDTO
            {
                Id = course.Id,
                Title = course.Title,
                Description = course.Description,
                AuthorId = course.AuthorId,
                Author = course.Author?.ToDTO()
            };
        }

        public static AuthorDTO ToDTO(this Author author)
        {
            if (author == null) return null;

            return new AuthorDTO
            {
                Id = author.Id,
                Name = author.Name,
                Bio = author.Bio
            };
        }

        public static MyCoursesDTO ToDTO(this MyCourses myCourse)
        {
            if (myCourse == null) return null;

            return new MyCoursesDTO
            {
                Id = myCourse.Id,
                UserId = myCourse.UserId,
                CourseId = myCourse.CourseId,
                Course = myCourse.Course?.ToDTO(),
                AddedOn = myCourse.AddedOn
            };
        }

        public static QuizDTO ToDTO(this Quiz quiz)
        {
            if (quiz == null) return null;

            return new QuizDTO
            {
                Id = quiz.Id,
                Title = quiz.Title,
                CourseId = quiz.CourseId,
                Questions = quiz.Questions?.Select(q => q.ToDTO()).ToList()
            };
        }

        public static QuestionDTO ToDTO(this Question question)
        {
            if (question == null) return null;

            return new QuestionDTO
            {
                Id = question.Id,
                Text = question.Text,
                QuizId = question.QuizId,
                Answers = question.Answers?.Select(a => a.ToDTO()).ToList()
            };
        }

        public static AnswerDTO ToDTO(this Answer answer)
        {
            if (answer == null) return null;

            return new AnswerDTO
            {
                Id = answer.Id,
                Text = answer.Text,
                IsCorrect = answer.IsCorrect,
                QuestionId = answer.QuestionId
            };
        }

        public static UserQuizAttemptDTO ToDTO(this UserQuizAttempt attempt)
        {
            if (attempt == null) return null;

            return new UserQuizAttemptDTO
            {
                Id = attempt.Id,
                UserId = attempt.UserId,
                QuizId = attempt.QuizId,
                Quiz = attempt.Quiz?.ToDTO(),
                Score = attempt.Score,
                AttemptDate = attempt.AttemptDate
            };
        }

        public static UserDTO ToDTO(this CourseUser user)
        {
            if (user == null) return null;

            return new UserDTO
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName
            };
        }

        public static List<CourseDTO> ToDTO(this IEnumerable<Course> courses)
        {
            return courses?.Select(c => c.ToDTO()).ToList();
        }

        public static List<AuthorDTO> ToDTO(this IEnumerable<Author> authors)
        {
            return authors?.Select(a => a.ToDTO()).ToList();
        }

        public static List<MyCoursesDTO> ToDTO(this IEnumerable<MyCourses> myCourses)
        {
            return myCourses?.Select(mc => mc.ToDTO()).ToList();
        }

        public static List<QuizDTO> ToDTO(this IEnumerable<Quiz> quizzes)
        {
            return quizzes?.Select(q => q.ToDTO()).ToList();
        }

        public static List<UserQuizAttemptDTO> ToDTO(this IEnumerable<UserQuizAttempt> attempts)
        {
            return attempts?.Select(a => a.ToDTO()).ToList();
        }
    }
}