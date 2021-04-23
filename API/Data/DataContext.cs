using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole,int,
     IdentityUserClaim<int>,AppUserRole, IdentityUserLogin<int>,
     IdentityRoleClaim<int>,IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}

        DbSet<CompanyJobsLinks> CompanyJobsLinksDB { get; set; }
        DbSet<CVUser> UserWithCVDB { get; set; }
        DbSet<Groups> GroupsDB { get; set; }
        DbSet<HREntryLevelJobs> HREntryLevelJobsDB { get; set; }
        DbSet<HRInternships> HRInternshipsDB { get; set; }
        DbSet<HRJuniorLevelJobs> HRJuniorLevelJobsDB { get; set; }
        DbSet<HRWorkShops> HRWorkShopsDB { get; set; }
        DbSet<InternShipsLinks> InternShipsLinksDB { get; set; }
        DbSet<Learnings> LearningsDB { get; set; }
        DbSet<WorkShops> WorkShopsDB { get; set; }


        //Fluent API - used to overwrite the EF Core conventions
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

           //Relationship AppRole - AppUser and vice versa
           modelBuilder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur =>ur.UserId)
            .IsRequired();

           modelBuilder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur =>ur.RoleId)
            .IsRequired();
            
        }
    }
}