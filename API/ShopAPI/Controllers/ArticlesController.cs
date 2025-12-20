using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Data;
using ShopAPI.DTOs;
using ShopAPI.Models;

namespace ShopAPI.Controllers
{
    
        [ApiController]
        [Route("api/[controller]")]
        public class ArticlesController : ControllerBase
        {
            private readonly AppDbContext _db;

            public ArticlesController(AppDbContext db)
            {
                _db = db;
            }

            [HttpGet]
            [AllowAnonymous]
            public async Task<IActionResult> GetAll([FromQuery] string? q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
            {
                var query = _db.Articles.AsQueryable();

                if (!string.IsNullOrWhiteSpace(q))
                {
                    query = query.Where(a => a.Title.Contains(q) || (a.Description ?? "").Contains(q));
                }

                var total = await query.CountAsync();
                var items = await query.OrderByDescending(a => a.CreatedAt)
                                       .Skip((page - 1) * pageSize)
                                       .Take(pageSize)
                                       .ToListAsync();

                return Ok(new { total, items });
            }

            [HttpGet("{id:int}")]
            [AllowAnonymous]
            public async Task<IActionResult> GetById(int id)
            {
                var article = await _db.Articles.FindAsync(id);
                if (article == null) return NotFound();
                return Ok(article);
            }

            [HttpPost]
            [Authorize(Policy = "RequireAdminRole")]
            public async Task<IActionResult> Create([FromBody] ArticleDto dto)
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var article = new Article
                {
                    Title = dto.Title,
                    Description = dto.Description,
                    Price = dto.Price,
                    ImageUrl = dto.ImageUrl,
                    Stock = dto.Stock
                };

                _db.Articles.Add(article);
                await _db.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
            }

            [HttpPut("{id:int}")]
            [Authorize(Policy = "RequireAdminRole")]
            public async Task<IActionResult> Update(int id, [FromBody] ArticleDto dto)
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);

                var article = await _db.Articles.FindAsync(id);
                if (article == null) return NotFound();

                article.Title = dto.Title;
                article.Description = dto.Description;
                article.Price = dto.Price;
                article.ImageUrl = dto.ImageUrl;
                article.Stock = dto.Stock;
                article.UpdatedAt = DateTime.UtcNow;

                await _db.SaveChangesAsync();
                return Ok(article);
            }

            [HttpDelete("{id:int}")]
            [Authorize(Policy = "RequireAdminRole")]
            public async Task<IActionResult> Delete(int id)
            {
                var article = await _db.Articles.FindAsync(id);
                if (article == null) return NotFound();

                _db.Articles.Remove(article);
                await _db.SaveChangesAsync();
                return NoContent();
            }
        }
    }

