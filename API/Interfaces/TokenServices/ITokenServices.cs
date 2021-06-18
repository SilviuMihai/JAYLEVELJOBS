using API.Entities;

namespace API.Interfaces.TokenServices
{
    public interface ITokenServices
    {
        string CreateToken(AppUser user);
    }
}