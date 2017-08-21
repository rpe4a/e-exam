namespace Exam.Domain.Core
{
    public abstract class CorrectAnswer
    {
        public string Id { get; set; }

        public virtual Issue Issue { get; set; }

    }
}