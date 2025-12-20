using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;
using System.Security.Claims;

namespace ShopAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // User doit être authentifié
    public class CartController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CartController(AppDbContext db)
        {
            _db = db;
        }

        private string GetUserId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("User not found");

        [HttpGet]
        public async Task<IActionResult> GetMyCart()
        {
            var userId = GetUserId();

            var items = await _db.CartItems
                .Include(ci => ci.Article)
                .Where(ci => ci.UserId == userId)
                .ToListAsync();

            var total = items.Sum(i => i.Article!.Price * i.Quantity);
            return Ok(new
            {
                items = items.Select(i => new
                {
                    i.Id,
                    i.ArticleId,
                    i.Quantity,
                    i.AddedAt,
                    Title = i.Article!.Title,
                    Price = i.Article!.Price,
                    ImageUrl = i.Article!.ImageUrl
                }),
                total
            });
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody] CartItemDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = GetUserId();

            var article = await _db.Articles.FindAsync(dto.ArticleId);
            if (article == null) return NotFound("Article not found");
            if (article.Stock <= 0) return BadRequest("Article out of stock");

            var existing = await _db.CartItems.FirstOrDefaultAsync(ci => ci.UserId == userId && ci.ArticleId == dto.ArticleId);
            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
            }
            else
            {
                _db.CartItems.Add(new CartItem
                {
                    UserId = userId,
                    ArticleId = dto.ArticleId,
                    Quantity = dto.Quantity
                });
            }

            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{cartItemId:int}")]
        public async Task<IActionResult> Remove(int cartItemId)
        {
            var userId = GetUserId();

            var item = await _db.CartItems.FirstOrDefaultAsync(ci => ci.Id == cartItemId && ci.UserId == userId);
            if (item == null) return NotFound();

            _db.CartItems.Remove(item);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout()
        {
            var userId = GetUserId();

            var items = await _db.CartItems.Include(ci => ci.Article).Where(ci => ci.UserId == userId).ToListAsync();
            if (!items.Any()) return BadRequest("Cart is empty");

            // Simple check stock
            foreach (var item in items)
            {
                if (item.Article!.Stock < item.Quantity)
                    return BadRequest($"Not enough stock for {item.Article.Title}");
            }

            // Décrémenter stock
            foreach (var item in items)
            {
                item.Article!.Stock -= item.Quantity;
            }

            // Ici: intégrer un vrai paiement (Stripe/PayPal) avec intents et webhooks
            // Simule le paiement réussi
            _db.CartItems.RemoveRange(items);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Payment successful" });
        }
    }
}
