namespace ShopAPI.Models
{
    using System.ComponentModel.DataAnnotations;

    
    
        public class Article
        {
            public int Id { get; set; }

            [Required, MaxLength(200)]
            public string Title { get; set; } = default!;

            [MaxLength(2000)]
            public string? Description { get; set; }

            [Range(0, double.MaxValue)]
            public decimal Price { get; set; }

            [MaxLength(255)]
            public string? ImageUrl { get; set; }

            public int Stock { get; set; } = 0;

            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime? UpdatedAt { get; set; }
        }
    

}
