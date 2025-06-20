using ChatApp.Data;
using ChatApp.DTOs;
using ChatApp.Models;
using ChatApp.Utils;

namespace ChatApp.Services
{
    public class AuthService
    {
        private readonly ChatDbContext _Context;
        public AuthService(ChatDbContext context)
        {
            _Context = context;
        }

        public async Task<User?> RegisterAsync(RegisterDto registerDto)
        {
            if (_Context.Users.Any(u => u.Email == registerDto.Email))
                return null; // Email already exists

            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PasswordHash = PasswordHasher.Hash(registerDto.Password)
            };

            _Context.Users.Add(user);
            await _Context.SaveChangesAsync();

            return user;
        }
    }
}
