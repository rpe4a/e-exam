using System;
using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Экзамен
    /// </summary>
    public class Exam
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        /// <summary> 
        /// Продолжительность выполнения экзамена 
        /// </summary> 
        public DateTime DurationTime { get; set; }

        /// <summary>
        /// Задания в экзамене
        /// </summary>
        public virtual ICollection<Task> Tasks { get; set; }

        public virtual ExamDirective Directive { get; set; }
    }
}
