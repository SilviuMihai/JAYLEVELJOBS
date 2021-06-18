using System.ComponentModel.DataAnnotations;

namespace API.DTOs.AccountDTOs
{
    public class ForgotPassword
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
    }
}