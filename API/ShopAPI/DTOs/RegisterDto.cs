using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DTOs
{
    public class RegisterDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = default!;

        [Required, MinLength(8)]
        public string Password { get; set; } = default!;

        [Required]
        public string FullName { get; set; } = default!;
    }
}

