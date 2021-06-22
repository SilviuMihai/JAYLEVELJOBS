using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Extensions.PasswordValidation
{
    public class MaximumLengthPasswordValidation<TUser> : IPasswordValidator<TUser>
    where TUser : class
    {
        public Task<IdentityResult> ValidateAsync(UserManager<TUser> manager, TUser user, string password)
        {
            if(password.Length > 32)
            {
                return Task.FromResult(IdentityResult.Failed(new IdentityError
                    {
                        Code = "Maximum 32 of characters",
                        Description = "You cannot set the password to have more than 32 of characters !"
                    }));
            }
            return Task.FromResult(IdentityResult.Success);
        }
    }
}