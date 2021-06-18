using System.ComponentModel.DataAnnotations;

namespace API.DTOs.AccountDTOs
{
    public class ResetPasswordDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password",ErrorMessage = "Password and Confirm Password must match !")]
        public string ConfirmPassword { get; set; }

        public string Token { get; set; }
    }
}