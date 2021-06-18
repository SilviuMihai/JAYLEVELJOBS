using System.ComponentModel.DataAnnotations;

namespace API.DTOs.AccountDTOs
{
    public class UserDto
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}