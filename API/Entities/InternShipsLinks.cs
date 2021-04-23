using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class InternShipsLinks
    {
        [Key]
        public int IdInternShipsLinks { get; set; }
        [Required]
        public string URL { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
         //Foreign Key
        public int AppUserId { get; set; }
        //Reference Navigation Property
        public AppUser AppUser { get; set; }

    }
}