using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;

namespace Exam.Domain.Admin
{
    public class User : IUser
    {
        public string Id { get; set; }

        public string Surname { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public bool EmailConfirmed { get; set; }

        public string PasswordHash { get; set; }

        public bool LockoutEnabled { get; set; }

        public DateTime CreateTime { get; set; }

        public virtual ICollection<UserInRole> Roles { get; set; }
    }
}