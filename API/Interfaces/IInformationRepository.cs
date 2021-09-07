using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.InformationDTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IInformationRepository
    {
        void AddCompany(CompanyJobsLinks company);
        Task<IEnumerable<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksLoggedInUser(int userId);
        Task<IEnumerable<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksAllUsers();
        Task<bool> GetNumberOfPosts(int id, DateTime date);
        Task<IEnumerable<GetCompaniesJobsLinksDto>> SearchJob(string searchJob);
        Task<CompanyJobsLinks> GetCompanyJobLink(int id);
        void AddChangesInCompanyJobsLinks(CompanyJobsLinks company);
        void RemoveCompanyJobLink(CompanyJobsLinks companyJobsLinks);
        Task<bool> Complete();
    }
}