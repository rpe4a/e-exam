namespace Exam.Domain.Core
{
    public abstract class Directive
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string PartentId { get; set; }
    }
}