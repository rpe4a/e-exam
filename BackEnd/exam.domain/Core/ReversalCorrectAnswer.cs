namespace Exam.Domain.Core
{
    public class ReversalCorrectAnswer : CorrectAnswer
    {
        public virtual VersionAnswer Left { get; set; }

        public virtual VersionAnswer Right { get; set; }
    }
}