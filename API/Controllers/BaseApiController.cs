using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

   /*  Automatic HTTP 400 responses
       The [ApiController] attribute makes model validation errors automatically trigger an 
       HTTP 400 response. Consequently, the following code is unnecessary in an action method:
       if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
    */
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}