using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Groups
    {
        [Key]
        public int IdGroups { get; set; }
        
        [Required]
        public string URL { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}