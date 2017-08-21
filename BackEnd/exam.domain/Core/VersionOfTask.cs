using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Вариант
    /// </summary>
    public class VersionOfTask
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public bool IsAutoSort { get; set; }

        public virtual Task Task { get; set; }

        public virtual ICollection<LinkVersionWithIssue> Issue { get; set; }
    }
}