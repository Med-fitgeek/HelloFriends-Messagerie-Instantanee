using ChatApp.DTOs;
using ChatApp.Services;
using Microsoft.AspNetCore.Mvc;


namespace ChatApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (registerDto == null || string.IsNullOrEmpty(registerDto.Username) ||
                string.IsNullOrEmpty(registerDto.Email) || string.IsNullOrEmpty(registerDto.Password))
            {
                return BadRequest("Invalid registration data.");
            }
            var user = await _authService.RegisterAsync(registerDto);
            if (user == null)
            {
                return BadRequest("Email already exists.");
            }
            return Ok(new { message = "Subscription successed", user.Id, user.Username, user.Email });

        }
    }
}
