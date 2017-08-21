using System.Collections.Generic;

namespace Exam.Domain.Core
{
    public class SelectCorrectAnswer : CorrectAnswer
    {
        public virtual ICollection<VersionAnswer> Answers { get; set; }
    }
}