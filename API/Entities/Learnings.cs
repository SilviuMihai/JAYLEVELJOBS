using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Learnings
    {
        [Key]
        public int IdLearnings { get; set; }
        
        public string URLCourse { get; set; }
        public string URLTutorial { get; set; }
        public string Description { get; set; }

        //Foreign Key
        public int AppUserId { get; set; }
        
        //Reference Navigation Property
        public AppUser AppUser { get; set; }
    }
}