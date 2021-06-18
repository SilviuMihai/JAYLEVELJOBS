using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    //Dependent Entity
    public class CVUser
    {
        [Key]
        public int IdCVUser { get; set; }
        
        public string URL { get; set; }
        public DateTime DateCVAdded { get; set; }


        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}