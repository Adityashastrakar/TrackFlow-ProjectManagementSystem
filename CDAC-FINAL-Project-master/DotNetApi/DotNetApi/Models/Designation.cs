using System;
using System.Collections.Generic;

namespace DotNetApi.Models
{
    public partial class Designation
    {
        public Designation()
        {
            Employees = new HashSet<Employee>();
        }

        public int Designationid { get; set; }
        public string? DesignationName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
