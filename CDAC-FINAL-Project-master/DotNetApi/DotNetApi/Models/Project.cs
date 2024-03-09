using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Project
    {
        public Project()
        {
            PrjMgrs = new HashSet<PrjMgr>();
            Tasktables = new HashSet<Tasktable>();
            Teams = new HashSet<Team>();
        }

        public int Pid { get; set; }
        public string Title { get; set; } = null!;
        public string Techstack { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime? Deadline { get; set; }
        public ulong? Status { get; set; }
        public string? Comments { get; set; }
        public int? Empid { get; set; }
        public int? Clientid { get; set; }

        public virtual Client? Client { get; set; }
        public virtual Employee? Emp { get; set; }
        public virtual ICollection<PrjMgr> PrjMgrs { get; set; }
        public virtual ICollection<Tasktable> Tasktables { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
    }
}
