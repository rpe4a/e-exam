namespace Exam.Domain.Core
{
    /// <summary>
    /// Вариант ответа
    /// </summary>
    public class VersionAnswer
    {
        public string Id { get; set; }
        
        public string Content { get; set; }

        /// <summary>
        /// Вопрос
        /// </summary>
        public virtual Issue Issue { get; set; }
    }
}