using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class CompanyJobsLinks
    {
        [Key]
        public int IdCompanyJobsLinks { get; set; }
        
        
        public string URL { get; set; }
        public string NameURL { get; set; }
        public string ShortDescription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        //Posts Checking
        public DateTime CheckDate { get; set; }

        //Reported Link
        public int? ReportedLink { get; set; }

        //Link not available or Job expired
        public int? LinkNotAvailable { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}