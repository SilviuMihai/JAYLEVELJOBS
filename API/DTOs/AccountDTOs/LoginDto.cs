using System.ComponentModel.DataAnnotations;

namespace API.DTOs.AccountDTOs
{
    public class LoginDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        
        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}