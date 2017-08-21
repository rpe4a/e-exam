using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Представление задания в экзамене
    /// </summary>
    public enum ViewOfTask
    {
        /// <summary>
        /// Тестовое задание
        /// </summary>
        Test,

        /// <summary>
        /// Свободаня форма
        /// </summary>
        FreeForm
    }


    /// <summary>
    /// Задание
    /// </summary>
    public  class Task
    {
        public string Id { get; set; }
        
        public string Name { get; set; }

        public ViewOfTask View { get; set; }

        public virtual Exam Exam { get; set; }

        /// <summary>
        /// Варианты задания
        /// </summary>
        public virtual ICollection<VersionOfTask> Versions { get; set; }

        public virtual TaskDirective Directive { get; set; }
    }
}