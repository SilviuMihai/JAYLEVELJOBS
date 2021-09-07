using API.DTOs.AccountDTOs;
using API.DTOs.InformationDTOs;
using API.Entities;
using AutoMapper;

namespace API.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            //Used for registration of user
            CreateMap<RegisterDto,AppUser>();

            //Used for Users that Posts and Get company links
            CreateMap<PostCompaniesJobsLinksDto,CompanyJobsLinks>()
            .ForMember(dest =>dest.AppUserId, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest =>dest.AppUser, opt => opt.MapFrom(src => src.CurrentUser));
            CreateMap<CompanyJobsLinks,GetCompaniesJobsLinksDto>();
        }
    }
}