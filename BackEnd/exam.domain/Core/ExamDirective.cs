using System.Collections;
using System.Collections.Generic;

namespace Exam.Domain.Core
{
    /// <summary>
    /// Директива экзаменов
    /// </summary>
    public class ExamDirective : Directive
    {
         public virtual ICollection<Exam> Exams { get; set; }
    }
}