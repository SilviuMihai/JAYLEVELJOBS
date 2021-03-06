// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210811084931_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.0");

            modelBuilder.Entity("API.Entities.AppRole", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("HrUserCheck")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("TEXT");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("TEXT");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("TEXT");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("API.Entities.AppUserRole", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("API.Entities.CVUser", b =>
                {
                    b.Property<int>("IdCVUser")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DateCVAdded")
                        .HasColumnType("TEXT");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("IdCVUser");

                    b.HasIndex("AppUserId")
                        .IsUnique();

                    b.ToTable("UserWithCVDB");
                });

            modelBuilder.Entity("API.Entities.CompanyJobsLinks", b =>
                {
                    b.Property<int>("IdCompanyJobsLinks")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CheckDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<int?>("LinkNotAvailable")
                        .HasColumnType("INTEGER");

                    b.Property<string>("NameURL")
                        .HasColumnType("TEXT");

                    b.Property<int?>("ReportedLink")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("IdCompanyJobsLinks");

                    b.HasIndex("AppUserId");

                    b.ToTable("CompanyJobsLinksDB");
                });

            modelBuilder.Entity("API.Entities.Groups", b =>
                {
                    b.Property<int>("IdGroups")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("IdGroups");

                    b.HasIndex("AppUserId");

                    b.ToTable("GroupsDB");
                });

            modelBuilder.Entity("API.Entities.HREntryLevelJobs", b =>
                {
                    b.Property<int>("IdHREntryLevelJobs")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<string>("Duration")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmploymentType")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDateEnrollment")
                        .HasColumnType("TEXT");

                    b.Property<string>("MainLanguage")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProjectDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("Required")
                        .HasColumnType("TEXT");

                    b.Property<string>("Responsabilities")
                        .HasColumnType("TEXT");

                    b.HasKey("IdHREntryLevelJobs");

                    b.HasIndex("AppUserId");

                    b.ToTable("HREntryLevelJobsDB");
                });

            modelBuilder.Entity("API.Entities.HRInternships", b =>
                {
                    b.Property<int>("IdHRInternships")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDateEnrollment")
                        .HasColumnType("TEXT");

                    b.Property<string>("MainLanguage")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProjectDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("Required")
                        .HasColumnType("TEXT");

                    b.Property<string>("Responsabilities")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("IdHRInternships");

                    b.HasIndex("AppUserId");

                    b.ToTable("HRInternshipsDB");
                });

            modelBuilder.Entity("API.Entities.HRJuniorLevelJobs", b =>
                {
                    b.Property<int>("IdHRJuniorLevelJobs")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<string>("Duration")
                        .HasColumnType("TEXT");

                    b.Property<string>("EmploymentType")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDateEnrollment")
                        .HasColumnType("TEXT");

                    b.Property<string>("MainLanguage")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProjectDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("Required")
                        .HasColumnType("TEXT");

                    b.Property<string>("Responsabilities")
                        .HasColumnType("TEXT");

                    b.HasKey("IdHRJuniorLevelJobs");

                    b.HasIndex("AppUserId");

                    b.ToTable("HRJuniorLevelJobsDB");
                });

            modelBuilder.Entity("API.Entities.HRWorkShops", b =>
                {
                    b.Property<int>("IdHRWorkShops")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("City")
                        .HasColumnType("TEXT");

                    b.Property<string>("Company")
                        .HasColumnType("TEXT");

                    b.Property<string>("Country")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("EndDateEnrollment")
                        .HasColumnType("TEXT");

                    b.Property<string>("MainLanguage")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProjectDescription")
                        .HasColumnType("TEXT");

                    b.Property<string>("Required")
                        .HasColumnType("TEXT");

                    b.Property<string>("Responsabilities")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.HasKey("IdHRWorkShops");

                    b.HasIndex("AppUserId");

                    b.ToTable("HRWorkShopsDB");
                });

            modelBuilder.Entity("API.Entities.InternShipsLinks", b =>
                {
                    b.Property<int>("IdInternShipsLinks")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("IdInternShipsLinks");

                    b.HasIndex("AppUserId");

                    b.ToTable("InternShipsLinksDB");
                });

            modelBuilder.Entity("API.Entities.Learnings", b =>
                {
                    b.Property<int>("IdLearnings")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("URLCourse")
                        .HasColumnType("TEXT");

                    b.Property<string>("URLTutorial")
                        .HasColumnType("TEXT");

                    b.HasKey("IdLearnings");

                    b.HasIndex("AppUserId");

                    b.ToTable("LearningsDB");
                });

            modelBuilder.Entity("API.Entities.WorkShops", b =>
                {
                    b.Property<int>("IdWorkShops")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AppUserId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("EndDate")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("URL")
                        .HasColumnType("TEXT");

                    b.HasKey("IdWorkShops");

                    b.HasIndex("AppUserId");

                    b.ToTable("WorkShopsDB");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClaimType")
                        .HasColumnType("TEXT");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .HasColumnType("TEXT");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("API.Entities.AppUserRole", b =>
                {
                    b.HasOne("API.Entities.AppRole", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("API.Entities.CVUser", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithOne("CVUser")
                        .HasForeignKey("API.Entities.CVUser", "AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.CompanyJobsLinks", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("CompanyJobsLinks")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.Groups", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Groups")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.HREntryLevelJobs", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("HREntryLevelJobs")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.HRInternships", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("HRInternships")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.HRJuniorLevelJobs", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("HRJuniorLevelJobs")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.HRWorkShops", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("HRWorkShops")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.InternShipsLinks", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("InternShips")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.Learnings", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Learnings")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.WorkShops", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("WorkShops")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<int>", b =>
                {
                    b.HasOne("API.Entities.AppRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<int>", b =>
                {
                    b.HasOne("API.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("API.Entities.AppRole", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("CompanyJobsLinks");

                    b.Navigation("CVUser");

                    b.Navigation("Groups");

                    b.Navigation("HREntryLevelJobs");

                    b.Navigation("HRInternships");

                    b.Navigation("HRJuniorLevelJobs");

                    b.Navigation("HRWorkShops");

                    b.Navigation("InternShips");

                    b.Navigation("Learnings");

                    b.Navigation("UserRoles");

                    b.Navigation("WorkShops");
                });
#pragma warning restore 612, 618
        }
    }
}
