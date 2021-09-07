using System;

namespace API.DTOs.InformationDTOs
{
    public class GetCompaniesJobsLinksDto
    {
        public int IdCompanyJobsLinks { get; set; }
        public string URL { get; set; }
        public string NameURL { get; set; }
        public string ShortDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        
        //Reported Link
        public int? ReportedLink { get; set; }

        //Link not available or Job expired
        public int? LinkNotAvailable { get; set; }
    }
}