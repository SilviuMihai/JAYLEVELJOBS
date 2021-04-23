using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    //Class used for creating the relationship between the user-roles and role-users (many-to-many)
    //Table used for joining tables (Inner Join -sql)
    public class AppUserRole : IdentityUserRole<int>
    {
        public AppUser User { get; set; }
        public AppRole Role { get; set; }
    }
}