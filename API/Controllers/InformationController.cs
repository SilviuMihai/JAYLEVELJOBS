using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs.InformationDTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.AspNetCore.Http;
using API.Helpers.Pagination;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    public class InformationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IInformationRepository _informationRepository;
        private readonly UserManager<AppUser> _userManager;

        public InformationController(IMapper mapper, IInformationRepository informationRepository, UserManager<AppUser> userManager)
        {
            _informationRepository = informationRepository;
            _userManager = userManager;
            _mapper = mapper;
        }
        [Authorize]
        [HttpPost("post-companies-jobs-links")]
        public async Task<ActionResult> PostCompaniesJobsLinks([FromBody] PostCompaniesJobsLinksDto companiesJobsLinksDto)
        {
            if (companiesJobsLinksDto.URL == null || companiesJobsLinksDto.NameURL == null)
            {
                return BadRequest("Please enter an address or name !");
            }

            //Claims only works if the client sends the token, so from there it gets the user //checked with postman
            //Get the current User logged in
            var name = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(name == null)
            {
                return Unauthorized();
            }
            //FindByNameAsync will return an exception if name is null
            var user = await _userManager.FindByNameAsync(name);

            if(user == null)
            {
                return Unauthorized();
            }

            //Fill up the missing properties with the current user registered
            companiesJobsLinksDto.Id = user.Id;
            companiesJobsLinksDto.CurrentUser = user;

            //Set Date
            companiesJobsLinksDto.CheckDate = DateTime.UtcNow;

            //Checking Number of posts per user (in case the user wants to post a job)
            if(await _informationRepository.GetNumberOfPosts(user.Id,companiesJobsLinksDto.CheckDate))
            {
                return BadRequest("You already posted 3 jobs, please try tomorrow !");
            }

            //use of automapper (take the values from the dto and put them into the entity)
            var company = _mapper.Map<CompanyJobsLinks>(companiesJobsLinksDto);
            
            //use of repository to put the values into the database, using the repository
            _informationRepository.AddCompany(company);

           if(await _informationRepository.Complete())
            {
                return Ok();
            } 
            
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpGet("get-companies-jobs-links")]
        public async Task<ActionResult<IEnumerable<GetCompaniesJobsLinksDto>>> GetCompaniesJobsLinks([FromQuery]UserParams userParams)
        {     
            
            PagedList<GetCompaniesJobsLinksDto> jobs = null;

            //Claims only works if the client sends the token, so from there it gets the user
            //Get the current User logged in
            //Returns a null, if the user is not logged in
            var name =  User.FindFirstValue(ClaimTypes.NameIdentifier);
    
            if(name == null)
            {
                jobs = await _informationRepository.GetCompaniesJobsLinksAllUsers(userParams);
            }
            else
            {
                //Gets the user when it's logged in or will return an exception if the name is null.
                var user = await _userManager.FindByNameAsync(name);
                if(user == null)
                {
                    return BadRequest();
                }
                jobs = await _informationRepository.GetCompaniesJobsLinksLoggedInUser(userParams,user.Id);
            }

                Response.AddPaginationHeader(jobs.CurrentPage, jobs.PageSize, 
                jobs.TotalCount, jobs.TotalPages);

              return Ok(jobs);
        }

        [AllowAnonymous]
        [HttpPost("search-jobs-setbyusers")]
        public async Task<ActionResult<IEnumerable<GetCompaniesJobsLinksDto>>>SearchJobs([FromBody]SearchJobsDto searchJobsDto)
        {

            if(String.IsNullOrEmpty(searchJobsDto.SearchJob))
            {
                return NotFound("Please try to add something in the search bar !");
            }
            var jobs = await _informationRepository.SearchJob(searchJobsDto.SearchJob.ToLower());
            if(!jobs.Any())
            {
                return NotFound("Nothing was found !");
            }

            return Ok(jobs);
        }

        [Authorize]
        [HttpPut("reported-link/{id}")]
        public async Task<ActionResult> ReportedLink([FromRoute]int id)
        {
          var reportedLink = await _informationRepository.GetCompanyJobLink(id);

            if(reportedLink == null)
            {
                return BadRequest();
            }
            if(reportedLink.ReportedLink>1)
            {
              return Unauthorized();
            }

            //Added this functionality because of the null values
            //The null-coalescing assignment operator ??= assigns the value of its right-hand operand to 
            //its left-hand operand only if the left-hand operand evaluates to null. 
            //The ??= operator doesn't evaluate its right-hand operand if the left-hand operand 
            //evaluates to non-null.
            if(reportedLink.ReportedLink == null)
            {
                reportedLink.ReportedLink = reportedLink.ReportedLink ?? 1;
            }
            else
            {
                reportedLink.ReportedLink = reportedLink.ReportedLink + 1;
            }
           _informationRepository.AddChangesInCompanyJobsLinks(reportedLink);


            if(await _informationRepository.Complete())
            {
                return Ok();
            } 

            return BadRequest("Seems to be an Issue, with reporting the Link !");
        }

        [Authorize]
        [HttpPut("link-not-available/{id}")]
        public async Task<ActionResult> LinkNotAvailable([FromRoute]int id)
        {
            var linkNotAvailable  = await _informationRepository.GetCompanyJobLink(id);

            if(linkNotAvailable == null)
            {
                return BadRequest();
            }
            if(linkNotAvailable.LinkNotAvailable>1)
            {
                return Unauthorized();
            }

            //Added this functionality because of the null values
            //The null-coalescing assignment operator ??= assigns the value of its right-hand operand to 
            //its left-hand operand only if the left-hand operand evaluates to null. 
            //The ??= operator doesn't evaluate its right-hand operand if the left-hand operand 
            //evaluates to non-null.
            if(linkNotAvailable.LinkNotAvailable == null)
            {
                linkNotAvailable.LinkNotAvailable = linkNotAvailable.LinkNotAvailable ?? 1;
            }
            else
            {
             linkNotAvailable.LinkNotAvailable = linkNotAvailable.LinkNotAvailable + 1;
            }

            _informationRepository.AddChangesInCompanyJobsLinks(linkNotAvailable);

            if(await _informationRepository.Complete())
            {
                return Ok();
            } 

            return BadRequest("Seems to be an Issue, with reporting the Link !");
        }

        [Authorize]
        [HttpPut("edit-company-job-link")]
        public async Task<ActionResult> EditPostCompanyJobsLinks([FromBody]EditCompaniesJobsLinksDto companiesJobsLinksDto)
        {
            var companyJobLink = await _informationRepository.GetCompanyJobLink(companiesJobsLinksDto.IdCompanyJobsLinks);

            if(companyJobLink == null)
            {
                return BadRequest();
            }

            //Claims only works if the client sends the token, so from there it gets the user //checked with postman
            //Get the current User logged in
            var user = await _userManager.FindByNameAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));

            //To make sure that logged in user, makes changes on his post
            if(user.Id != companyJobLink.AppUserId)
            {
                return Unauthorized();
            }

            //Actualize the database with the new inputs from the user
            companyJobLink.URL = companiesJobsLinksDto.URL;
            companyJobLink.NameURL = companiesJobsLinksDto.NameURL;
            companyJobLink.ShortDescription = companiesJobsLinksDto.ShortDescription;
            companyJobLink.StartDate = companiesJobsLinksDto.StartDate;
            companyJobLink.EndDate = companiesJobsLinksDto.EndDate;
        

            _informationRepository.AddChangesInCompanyJobsLinks(companyJobLink);

             if(await _informationRepository.Complete())
            {
                return Ok();
            } 

            return BadRequest("Failed to Edit the Post !");
        }

        [Authorize]
        [HttpDelete("delete-company-job-link/{id}")]
         public async Task<ActionResult> DeletePostCompanyJobsLinks([FromRoute]int id)
        {
            var companyJobLink = await _informationRepository.GetCompanyJobLink(id);

            if(companyJobLink == null)
            {
                return BadRequest();
            }

            //Claims only works if the client sends the token, so from there it gets the user //checked with postman
            //Get the current User logged in
             var name = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(name == null)
            {
                return Unauthorized();
            }
            //FindByNameAsync will return an exception if name is null
            var user = await _userManager.FindByNameAsync(name);

            //To make sure that logged in user, makes changes on his post
            if(user.Id != companyJobLink.AppUserId)
            {
                return Unauthorized();
            }

            _informationRepository.RemoveCompanyJobLink(companyJobLink);

              if(await _informationRepository.Complete())
              {
                return Ok();
              } 

            return BadRequest("Failed to Remove the Post !");
        }
    }
}

//-Utilizatorul sa nu mai vada postul reportat. - done
//Acelasi utilizator, sa nu aiba acces pentru a raporta din nou link-ul, trebuie adaugata functionalitatea in controller
//Trebuie adaugat un Toastr ca sa confirme utilizatorului ca a raportat link-ul - done
//prima list = ((Userid logat == UserId Baza de date) && reportedLink == null && linkNotAvailable == null)
//a 2 lista =  ((Userid logat != UserId Baza de date) && reportedLink <3 || linkNotAvailable <3 || reportedLink ==null || linkNotAvailable ==null)
//concateneaza listele intr-una singura 