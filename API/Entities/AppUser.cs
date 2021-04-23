using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //Principal Entity
    public class AppUser:IdentityUser<int>
    {
        [Required]
        public bool HrUserCheck { get; set; }
        public string Company { get; set; }


        //Relationships
        //Collection Navigation Property
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<InternShipsLinks> InternShips { get; set; }
        public ICollection<WorkShops> WorkShops { get; set; }
        public ICollection<Learnings> Learnings { get; set; }
        public ICollection<CompanyJobsLinks> CompanyJobsLinks { get; set; }
        public ICollection<Groups> Groups { get; set; }
        public ICollection<HRWorkShops> HRWorkShops { get; set; }
        public ICollection<HRInternships> HRInternships { get; set; }
        public ICollection<HREntryLevelJobs> HREntryLevelJobs { get; set; }
        public ICollection<HRJuniorLevelJobs> HRJuniorLevelJobs { get; set; }


        //Reference Navigation Property
        public CVUser CVUser { get; set; }

        
    }
}