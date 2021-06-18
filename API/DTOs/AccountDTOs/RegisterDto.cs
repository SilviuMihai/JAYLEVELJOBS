using System.ComponentModel.DataAnnotations;

namespace API.DTOs.AccountDTOs
{
    public class RegisterDto
    {
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Password",ErrorMessage = "Password and Confirmation Password do not match !")]
        public string ConfirmPassword { get; set; }
        [Required]
        public bool HrUserCheck { get; set; }
        public string Company { get; set; }

        [Required]
        public string Username { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }


    }
}