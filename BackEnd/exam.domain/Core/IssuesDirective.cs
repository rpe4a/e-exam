using System.Collections;
using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Директива вопросов
    /// </summary>
    public class IssuesDirective : Directive
    {
        public virtual ICollection<Issue> Issues { get; set; }
    }
}