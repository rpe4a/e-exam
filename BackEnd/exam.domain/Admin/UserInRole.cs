namespace Exam.Domain.Admin
{
    public class UserInRole
    {
        public string Id { get; set; }

        public virtual string UserId { get; set; }

        public virtual string RoleId { get; set; }
    }
}