using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InformationDTOs
{
    public class SearchJobsDto
    {
        [MaxLength(50)]
        public string SearchJob { get; set; }
    }
}