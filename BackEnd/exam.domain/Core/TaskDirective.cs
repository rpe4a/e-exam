using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Директива заданий
    /// </summary>
    public class TaskDirective : Directive
    {
         public virtual ICollection<Task> Tasks { get; set; }
    }
}