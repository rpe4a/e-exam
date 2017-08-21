using System;
using System.Collections.Generic;
using Microsoft.AspNet.Identity;

namespace Exam.Domain.Admin
{
    public class Role : IRole
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime CreateTime { get; set; }

        public virtual ICollection<UserInRole> Users { get; set; }
    }
}