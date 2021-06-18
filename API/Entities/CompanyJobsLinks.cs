using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class CompanyJobsLinks
    {
        [Key]
        public int IdCompanyJobsLinks { get; set; }
        
        
        public string URL { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}