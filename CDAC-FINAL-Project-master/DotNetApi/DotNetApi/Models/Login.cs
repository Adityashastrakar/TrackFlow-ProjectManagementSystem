using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Login
    {
        public int LoginId { get; set; }
        public string Username { get; set; } = null!;
        public string? Password { get; set; }
        public int? RoleId { get; set; }
        public ulong? Status { get; set; }

        public virtual Role? Role { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
