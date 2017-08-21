namespace Exam.Domain.Core
{
    public class LinkVersionWithIssue
    {
        public string Id { get; set; }
        
        public virtual VersionOfTask Version { get; set; }
        
        public virtual Issue Issue { get; set; }

        /// <summary>
        /// Позиция вопроса в заданий
        /// </summary>
        public int Position { get; set; }
    }
}