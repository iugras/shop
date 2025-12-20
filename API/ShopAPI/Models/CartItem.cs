using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Models
{
    public class CartItem
    {
        
        
            public int Id { get; set; }

            [Required]
            public string UserId { get; set; } = default!;

            [Required]
            public int ArticleId { get; set; }

            [Range(1, int.MaxValue)]
            public int Quantity { get; set; } = 1;

            public DateTime AddedAt { get; set; } = DateTime.UtcNow;

            public Article? Article { get; set; }
    }
    
}
