using System.ComponentModel.DataAnnotations;

namespace ShopAPI.DTOs
{
    public class CartItemDto
    {
        [Required]
        public int ArticleId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;
    }
}
