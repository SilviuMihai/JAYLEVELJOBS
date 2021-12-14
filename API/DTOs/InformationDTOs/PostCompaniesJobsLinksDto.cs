using System;
using System.ComponentModel.DataAnnotations;
using API.Entities;
using Newtonsoft.Json;

namespace API.DTOs.InformationDTOs
{
    public class PostCompaniesJobsLinksDto
    {
        public int Id { get; set; }
        public AppUser CurrentUser { get; set; }


        [Required]
        public string URL { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        [Required]
        [MaxLength(25)]
        public string NameURL { get; set; }

        [MaxLength(80)]
        public string ShortDescription { get; set; }

        public DateTime CheckDate { get; set; }
    }
}