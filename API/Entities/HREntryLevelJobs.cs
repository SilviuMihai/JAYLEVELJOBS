using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class HREntryLevelJobs
    {
         [Key]
        public int IdHREntryLevelJobs { get; set; }
        public string ProjectDescription { get; set; }
        public string Responsabilities { get; set; }
        public string MainLanguage { get; set; }
        public string Required { get; set; }
        public string Company { get; set; }
        public string EmploymentType { get; set; }
        public string Duration { get; set; }

        
        public string City { get; set; }
        
        public string Country { get; set; }
        public DateTime EndDateEnrollment { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}