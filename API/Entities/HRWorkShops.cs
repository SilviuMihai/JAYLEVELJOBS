using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class HRWorkShops
    {
        [Key]
        public int IdHRWorkShops { get; set; }
        public string ProjectDescription { get; set; }
        public string Responsabilities { get; set; }
        public string MainLanguage { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Required { get; set; }
        public string Company { get; set; }

        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime EndDateEnrollment { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}