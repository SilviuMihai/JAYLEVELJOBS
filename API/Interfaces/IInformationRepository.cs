using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.InformationDTOs;
using API.Entities;
using API.Helpers;
using API.Helpers.Pagination;

namespace API.Interfaces
{
    public interface IInformationRepository
    {
        void AddCompany(CompanyJobsLinks company);
        Task<PagedList<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksLoggedInUser(UserParams userParams,int userId);
        Task<PagedList<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksAllUsers(UserParams userParams);
        Task<bool> GetNumberOfPosts(int id, DateTime date);
        Task<IEnumerable<GetCompaniesJobsLinksDto>> SearchJob(string searchJob);
        Task<CompanyJobsLinks> GetCompanyJobLink(int id);
        void AddChangesInCompanyJobsLinks(CompanyJobsLinks company);
        void RemoveCompanyJobLink(CompanyJobsLinks companyJobsLinks);
        Task<bool> Complete();
    }
}