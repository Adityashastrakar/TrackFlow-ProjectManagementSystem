using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Tasktable
    {
        public int Tid { get; set; }
        public string Tname { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime? Assigneddate { get; set; }
        public DateTime? Deadline { get; set; }
        public bool? Status { get; set; }
        public int? Progress { get; set; }
        public int? Empid { get; set; }
        public int? Pid { get; set; }

        public Tasktable(string tname, string description, DateTime? assigneddate, DateTime? deadline, bool? status, int? progress, int? empid, int? pid)
        {
            Tname = tname;
            Description = description;
            Assigneddate = assigneddate;
            Deadline = deadline;
            Status = status;
            Progress = progress;
            Empid = empid;
            Pid = pid;
        }


        public virtual Employee? Emp { get; set; }
        public virtual Project? PidNavigation { get; set; }
    }
}
