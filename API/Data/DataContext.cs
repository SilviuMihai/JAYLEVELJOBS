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

        public DbSet<CompanyJobsLinks> CompanyJobsLinksDB { get; set; }
        public DbSet<CVUser> UserWithCVDB { get; set; }
        public DbSet<Groups> GroupsDB { get; set; }
        public DbSet<HREntryLevelJobs> HREntryLevelJobsDB { get; set; }
        public DbSet<HRInternships> HRInternshipsDB { get; set; }
        public DbSet<HRJuniorLevelJobs> HRJuniorLevelJobsDB { get; set; }
        public DbSet<HRWorkShops> HRWorkShopsDB { get; set; }
        public DbSet<InternShipsLinks> InternShipsLinksDB { get; set; }
        public DbSet<Learnings> LearningsDB { get; set; }
        public DbSet<WorkShops> WorkShopsDB { get; set; }


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