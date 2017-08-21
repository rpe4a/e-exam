using System.Collections.Generic;

namespace Exam.Domain.Core
{
    public enum ViewOfQuestion
    {
        /// <summary>
        /// Одиночный выбор
        /// </summary>
        Single,

        /// <summary>
        /// Множественый выбор
        /// </summary>
        Set,

        /// <summary>
        /// Установка соответствия
        /// </summary>
        Reversal,


        /// <summary>
        /// Ввод слова
        /// </summary>
        Word,


        /// <summary>
        /// Свободный ответ
        /// </summary>
       Text
    }

    /// <summary>
    /// Вопрос
    /// </summary>
    public class Issue
    {
        public string Id { get; set; }

        /// <summary>
        /// Содержание вопроса
        /// </summary>
        public string Content { get; set; }

        public ViewOfQuestion View { get; set; }

        /// <summary>
        /// Правильные ответы
        /// </summary>
        public virtual CorrectAnswer CorrectAnswer { get; set; } 

        /// <summary>
        /// Варианты
        /// </summary>
        public virtual ICollection<LinkVersionWithIssue> Versions { get; set; } 

        /// <summary>
        /// Варианты ответов
        /// </summary>
        public virtual ICollection<VersionAnswer> Answers { get; set; } 


        public IssuesDirective Directive { get; set; } 
    }
}