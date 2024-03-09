using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Projects = new HashSet<Project>();
            Tasktables = new HashSet<Tasktable>();
            Teams = new HashSet<Team>();
        }

        public int Empid { get; set; }
        public string? Fullname { get; set; }
        public DateTime? Dob { get; set; }
        public string? Gender { get; set; }
        public string? Nationality { get; set; }
        public string? Email { get; set; }
        public string? Contact { get; set; }
        public string? Currentaddress { get; set; }
        public string? Permanentaddress { get; set; }
        public double? Basicsal { get; set; }
        public float? Incentives { get; set; }
        public DateTime? Hiredate { get; set; }
        public int? DesignationId { get; set; }
        public int? LoginId { get; set; }

        public virtual Designation? Designation { get; set; }
        public virtual Login? Login { get; set; }
        public virtual ICollection<Project> Projects { get; set; }
        public virtual ICollection<Tasktable> Tasktables { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
    }
}
