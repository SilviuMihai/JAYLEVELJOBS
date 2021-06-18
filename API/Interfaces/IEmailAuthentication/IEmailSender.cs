using System.Threading.Tasks;

namespace API.Interfaces.IEmailAuthentication
{
    public interface IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message);
        public Task Execute(string apiKey, string subject, string message, string email);
    }
}