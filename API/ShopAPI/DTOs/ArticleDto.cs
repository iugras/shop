using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DTOs
{
    public class ArticleDto
    {
        
            [Required, MaxLength(200)]
            public string Title { get; set; } = default!;

            [MaxLength(2000)]
            public string? Description { get; set; }

            [Range(0, double.MaxValue)]
            public decimal Price { get; set; }

            [MaxLength(255)]
            public string? ImageUrl { get; set; }

            [Range(0, int.MaxValue)]
            public int Stock { get; set; }
        }
    
}
