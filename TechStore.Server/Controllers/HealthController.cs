using Microsoft.AspNetCore.Mvc;

namespace TechStore.Server.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public string CheckServer()
    {
        return "Server is on.";
    }
}
