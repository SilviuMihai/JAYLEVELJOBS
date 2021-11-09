using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs.InformationDTOs;
using API.Entities;
using API.Helpers;
using API.Helpers.Pagination;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories
{
    public class InformationRepository : IInformationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public InformationRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        //Add a company in the database
        public void AddCompany(CompanyJobsLinks company)
        {
            _context.CompanyJobsLinksDB.Add(company);
        }

        //Get All the companies jobs with links that are valid from the database
        //Return all the objects of the CompanyJobsLinksDB and projects them to the GetCompaniesJobsLinksDto by using AutoMapper
         public async Task<PagedList<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksAllUsers(UserParams userParams)
        {
            var jobs = from s in _context.CompanyJobsLinksDB select s;

                 jobs = jobs.Where(x =>
                        ((x.ReportedLink < 3 || x.ReportedLink == null) 
                    && 
                        (x.LinkNotAvailable < 3 || x.LinkNotAvailable == null)));
            
            var companiesJobsLinksAllUsers = jobs.ProjectTo<GetCompaniesJobsLinksDto>(_mapper.ConfigurationProvider);

            return await PagedList<GetCompaniesJobsLinksDto>.CreateAsync(companiesJobsLinksAllUsers, userParams.PageNumber, userParams.PageSize);
        }


        //Get All the companies jobs with links that are valid from the database
        //Return all the objects of the CompanyJobsLinksDB and projects them to the GetCompaniesJobsLinksDto by using AutoMapper
        public async Task<PagedList<GetCompaniesJobsLinksDto>> GetCompaniesJobsLinksLoggedInUser(UserParams userParams, int userId)
        {
            var jobs = from s in _context.CompanyJobsLinksDB select s;
            var jobsListLoggedInUser = jobs;
            var jobsListOtherUsers = jobs;
       
            
                jobsListLoggedInUser = jobsListLoggedInUser.Where(x => x.AppUserId == userId && x.LinkNotAvailable == null && x.ReportedLink == null);
                jobsListOtherUsers = jobsListOtherUsers.Where(x => x.AppUserId != userId && 
                (x.ReportedLink < 3 || x.LinkNotAvailable <3 || x.ReportedLink == null || x.LinkNotAvailable == null));
                jobs = jobsListLoggedInUser.Concat(jobsListOtherUsers);

            var companiesJobsLinksLoggedInUsers =  jobs.ProjectTo<GetCompaniesJobsLinksDto>(_mapper.ConfigurationProvider);

            return await PagedList<GetCompaniesJobsLinksDto>.CreateAsync(companiesJobsLinksLoggedInUsers, userParams.PageNumber, userParams.PageSize);
        }

        //Get the number of posts that the user has posted in that respective day
        //Return True if the user has posted more than 3 jobs, else - less than 3 jobs
        public async Task<bool> GetNumberOfPosts(int id, DateTime date)
        {
            var companies = _context.CompanyJobsLinksDB.Where(x=> x.AppUserId == id && x.CheckDate.Date == date.Date);

            if(companies == null)
            {
                return false; // the user didn't post any company jobs that day
            }


            //else
            //{
                var count = await companies.CountAsync();
             //   if(count>2) // check if the user has posted more than 3 or less than 3 in that respective day
              //  {
               //     return true; //posted more than 3 jobs in that day
               // }
               // else
               // {
                    return false; // posted less than 3 jobs in that day
                //}
            //}
        }

        //Search for a specific job
        //Returns all the jobs that were found in the CompanyJobsLinksDB and projects them to GetCompaniesJobsLinksDto by using the AutoMapper
        public async Task<PagedList<GetCompaniesJobsLinksDto>> SearchJob(string searchJob, int? userId, UserParams userParams)
        {
            var jobs = from s in _context.CompanyJobsLinksDB select s;
            
            if(userId != null)
            {
                //Doesn't return the links by the user himself or by other users that past 3 reports
                var jobsListLoggedInUser = jobs;
                var jobsListOtherUsers = jobs;
     
                jobsListLoggedInUser = jobsListLoggedInUser.Where(x => x.AppUserId == userId && 
                x.LinkNotAvailable == null && x.ReportedLink == null);

                jobsListOtherUsers = jobsListOtherUsers.Where(x => x.AppUserId != userId && 
                    (x.ReportedLink < 3 || x.LinkNotAvailable <3 || x.ReportedLink == null 
                    || x.LinkNotAvailable == null));

                jobs = jobsListLoggedInUser.Concat(jobsListOtherUsers);

                jobs = jobs.Where(s =>
                s.ShortDescription.ToLower().Contains(searchJob) 
                || 
                s.NameURL.ToLower().Contains(searchJob));
            }
            else
            {
                //Casual user, will return all jobs, except the reported ones that are above 3
                jobs = jobs.Where(x=>x.ReportedLink < 3 || x.LinkNotAvailable <3 
                || x.ReportedLink == null || x.LinkNotAvailable == null);
                jobs = jobs.Where(s =>
                s.ShortDescription.ToLower().Contains(searchJob) 
                || 
                s.NameURL.ToLower().Contains(searchJob));
            }

            var searchedJobs = jobs.ProjectTo<GetCompaniesJobsLinksDto>(_mapper.ConfigurationProvider);
            
            return await PagedList<GetCompaniesJobsLinksDto>.CreateAsync(searchedJobs, userParams.PageNumber, userParams.PageSize);
        }

        //Gets a Company Job Link by using the id of the company
        //Returns the Object from the database CompanyJobsLinksDB
        public async Task<CompanyJobsLinks> GetCompanyJobLink(int id)
        {
            return  await _context.CompanyJobsLinksDB.FirstOrDefaultAsync(x => x.IdCompanyJobsLinks == id);
        }

        //User Reported or declared link not available or edited the Line from the database
        public void AddChangesInCompanyJobsLinks(CompanyJobsLinks company)
        {
            _context.Entry(company).State = EntityState.Modified;
        }

        //Removes a Company Job Link
        public void RemoveCompanyJobLink(CompanyJobsLinks companyJobsLinks)
        {
            _context.CompanyJobsLinksDB.Remove(companyJobsLinks);
        }

        public async Task<bool> Complete()
        {
           return await _context.SaveChangesAsync() > 0;
        }
    }
}