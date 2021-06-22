using System;
using System.Text;
using API.Data;
using API.Entities;
using API.Extensions.PasswordValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServiceExtenstions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
             //Setting up the Identity API
            services
            .AddIdentityCore<AppUser>(options =>
                //can be added different options towards the user, example being bellow
                {
                    // Password settings.
                    options.Password.RequireDigit = true;
                    options.Password.RequireLowercase = true;
                    options.Password.RequireNonAlphanumeric = true;
                    options.Password.RequireUppercase = true;
                    options.Password.RequiredLength = 8;
                    options.Password.RequiredUniqueChars = 1;

                    // Email settings
                    options.SignIn.RequireConfirmedEmail = true;
                    options.User.RequireUniqueEmail = true;

                    // Lockout settings
                    // Failed attempts is 5 times
                    options.Lockout.AllowedForNewUsers = true;
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(20);
                }   
            )
            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddRoleValidator<RoleValidator<AppRole>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders()
            .AddPasswordValidator<MaximumLengthPasswordValidation<AppUser>>();
            //Default token life span is 1 day


            // To overwrite the token life span
            /* services.Configure<DataProtectionTokenProviderOptions>(options =>{
                options.TokenLifespan = TimeSpan.FromHours(5);
            }); */
            //Note: email token confirmation life span can be changed



            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options => {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(config["TokenKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            return services;
        }
    }
}