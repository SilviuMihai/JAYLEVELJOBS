using System.ComponentModel.DataAnnotations;
using API.Helpers.Pagination;

namespace API.DTOs.InformationDTOs
{
    public class SearchJobsDto
    {
        [MaxLength(50)]
        public string SearchJob { get; set; }
    }
}