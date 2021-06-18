using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class HRJuniorLevelJobs
    {
         [Key]
        public int IdHRJuniorLevelJobs { get; set; }
        public string ProjectDescription { get; set; }
        public string Responsabilities { get; set; }
        public string MainLanguage { get; set; }
        public string Required { get; set; }
        public string Company { get; set; }
        public string EmploymentType { get; set; }
        public string Duration { get; set; }

        //[Required]
        public string City { get; set; }
        //[Required]
        public string Country { get; set; }
        public DateTime EndDateEnrollment { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}