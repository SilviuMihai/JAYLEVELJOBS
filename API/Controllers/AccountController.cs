using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs.AccountDTOs;
using API.Entities;
using API.Interfaces.IEmailAuthentication;
using API.Interfaces.TokenServices;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailSender _emailSender;
        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenServices _tokenService;
        public AccountController(UserManager<AppUser> userManager, IEmailSender emailSender,

        IMapper mapper, SignInManager<AppUser> signInManager, ITokenServices tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _mapper = mapper;
            _emailSender = emailSender;
            _userManager = userManager;
        }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody]RegisterDto registerDto)
    {
        if(registerDto.Username == null && 
        registerDto.Email == null && 
        registerDto.ConfirmPassword == null ) return BadRequest();
        
        if (await UserExists(registerDto.Email))
        {
            return BadRequest("User with the respective Email adress, already exists !");
        }

        //Map the Dto to the AppUser
        var user = _mapper.Map<AppUser>(registerDto);

        //user Lower cases
        user.UserName = registerDto.Username.ToLower();
        user.Email = registerDto.Email.ToLower();

        //Create the User
        var userResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!userResult.Succeeded) return BadRequest(userResult.Errors);


        //Create the Role
        //var roleResult = await _userManager.AddToRoleAsync(user,"User");

        //if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        //Create the token
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);

        if (token == null) return BadRequest();

        //base URL - to access the confirm-email action
        string clientURL = "https://localhost:4200/approve-email";

        //parameters
        var param = new Dictionary<string, string>
        {
            {"userId", user.Id.ToString() }, // or email
            {"token", token  }
        };

        //QueryHelpers.AddQueryString which helps for enconding/decoding of the URL
        var confirmationLink = QueryHelpers.AddQueryString(clientURL, param);

        //Version that would not work / missing encoder OR using RAZOR PAGES logic
        //CONFIRMATION LINK  (Request.Scheme is that to be converted in an URL)
        // var confirmationLink = "https://localhost:4200/approve-email?userId="+user.Id+"&token="+token; //Url.Action("ConfirmEmail", "Account", new { userId = user.Id, token = token }, Request.Scheme);

        await _emailSender.SendEmailAsync(user.Email, "Email Confirmation", confirmationLink);

        return Ok();
    }

    [HttpGet("confirm-email")]
    public async Task<ActionResult> ConfirmEmail([FromQuery]string userId, [FromQuery]string token)
    {
        if (userId == null || token == null) return Unauthorized();

        var user = await _userManager.FindByIdAsync(userId);

        if (user == null) return NotFound();

        //switches the flag from false to true in the database
        var result = await _userManager.ConfirmEmailAsync(user, token);

        if (result.Succeeded) return Ok();

        return Unauthorized();
    }

    [HttpPost("login-user")]
    public async Task<ActionResult<UserDto>> Login([FromBody] LoginDto loginDto)
    {    
        if (loginDto.Email == null || loginDto.Password == null) return BadRequest();

        var user = await _userManager.FindByEmailAsync(loginDto.Email.ToLower());

        if (user == null) return NotFound();

        if (user.EmailConfirmed == false) return Unauthorized();

        //login the user and verifies the password in the database
        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, true);
        
        if(result.IsLockedOut) return Unauthorized("The Account is locked, please try again after some time or reset password!");

        if (!result.Succeeded) return BadRequest();

        return new UserDto(){
            Username = user.UserName,
            Email = user.Email,
            
            //the token is needed so that the user can stay logged in 
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("forgot-password")]
    public async Task<ActionResult> ForgotPassword([FromBody] ForgotPassword forgotPassword)
    {
        var user = await _userManager.FindByEmailAsync(forgotPassword.Email.ToLower());

        if (user == null) return NotFound();

        if (user.EmailConfirmed == false) return Unauthorized();

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        //base URL - to access the confirm-email action
        string clientURL = "https://localhost:4200/reset-password";

        //parameters
        var param = new Dictionary<string, string>
        {
            {"email", user.Email }, 
            {"token", token  }
        };

       //QueryHelpers.AddQueryString which helps for enconding/decoding of the URL
        var passwordResetLink =  QueryHelpers.AddQueryString(clientURL, param);

        //Used in case of Razor Pages
        //var passwordResetLink = Url.Action("ResetPasswordLink", "Account", new { email = user.Email, token = token }, Request.Scheme);

        await _emailSender.SendEmailAsync(user.Email, "Access Link to Reset Password", passwordResetLink);

        return Ok();
    }

    [HttpPost("reset-password")]
    public async Task<ActionResult> ResetPassword([FromBody]ResetPasswordDto resetPasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email.ToLower());

        if (user == null && resetPasswordDto.Token == null) return Unauthorized();

        if (user.EmailConfirmed == false) return Unauthorized();

        var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.ConfirmPassword);

        if (result.Succeeded) return Ok();

        return BadRequest();
    }

    [HttpPost("change-password")]
    public async Task<ActionResult> ChangePassword([FromBody]ChangePasswordDto changePasswordDto)
    {
        var user = await _userManager.FindByEmailAsync(changePasswordDto.Email.ToLower());

        if (user == null) return Unauthorized();

        var password = await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword, changePasswordDto.ConfirmPassword);

        if (password.Succeeded) return Ok();

        return Unauthorized();
    }

    private async Task<bool> UserExists(string email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == email.ToLower());
    }
}
}