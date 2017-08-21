using System;

namespace Exam.Domain.Core
{
    /// <summary> 
    /// Прохождение экзамена пользователем 
    /// </summary> 
    public class PassingExam
    {
        public string Id { get; set; }

        public string UserId { get; set; }

        public string ExamId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime FinishTime { get; set; }
    }
}