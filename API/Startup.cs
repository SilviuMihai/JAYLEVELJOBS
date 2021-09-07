using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.AutoMapper;
using API.Data;
using API.Data.Repositories;
using API.EmailAuthentication;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Interfaces.IEmailAuthentication;
using API.Interfaces.TokenServices;
using API.Middleware;
using API.Services.TokenServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
  
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Method Extenstion: DataBase Connection and Token 
            services.AddApplicationServices(_config);

            //Added NewtonsoftJson for a better conversion of Json to NET and NET to JSON
            services.AddControllers().AddNewtonsoftJson();
            
            //Method Extention: Identity
            services.AddIdentityServices(_config);  

            services.AddCors();

            //Email Connection
            services.AddTransient<IEmailSender,EmailSender>();
            services.Configure<AuthMessageSenderOptions>(_config.GetSection("SendGridEmail"));

            //AutoMaooer
            services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

            services.AddScoped<IInformationRepository,InformationRepository>();

            services.AddAuthorization();


            // services.AddSwaggerGen(c =>
            // {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            // });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

        /* Set by default when using different environments */
           /*  if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseSwagger();
                // app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            } */

            /* Created a middleware to show the exceptions (errors) when are encountered */
            app.UseMiddleware<ExceptionMiddleware>();

            app.UseHttpsRedirection();

            app.UseRouting();
            
            app.UseCors(policy => policy.AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .WithOrigins("https://localhost:4200"));

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
