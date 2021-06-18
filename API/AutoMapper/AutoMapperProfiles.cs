using API.DTOs.AccountDTOs;
using API.Entities;
using AutoMapper;

namespace API.AutoMapper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto,AppUser>();
        }
    }
}