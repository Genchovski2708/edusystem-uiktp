using System;
using System.Collections.Generic;

namespace EducationSystem.Domain.DTOs
{
    public class SolveQuizDto
    {
        public Guid QuizId { get; set; }
        public Dictionary<Guid, Guid> Answers { get; set; } = new Dictionary<Guid, Guid>();
        // QuestionId -> Selected AnswerId
    }
}
