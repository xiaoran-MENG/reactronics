using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseController
    {
        private readonly ReactronicsContext ctx;

        public CartController(ReactronicsContext cxt)
        {
            this.ctx = cxt;
        }

        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            var cart = await FindCart();
            return cart == null ? NotFound() : ToCartDTO(cart);
        }



        [HttpPost]
        public async Task<ActionResult<CartDTO>> Add(int productId, int quantity)
        {
            var cart = await FindCart();
            if (cart == null) cart = Cart();

            var product = await ctx.Products.FindAsync(productId);
            if (product == null) return NotFound();

            // TODO: verify quantity in stock >= quantity
            cart.Add(product, quantity);
            return await ctx.SaveChangesAsync() > 0
                ? CreatedAtRoute("GetCart", ToCartDTO(cart))
                : BadRequest(new ProblemDetails { Title = "Failed to add to cart" });
        }

        [HttpDelete]
        public async Task<ActionResult> Remove(int productId, int quantity)
        {
            var cart = await FindCart();
            if (cart == null) return NotFound();
            cart.Remove(productId, quantity);
            return await ctx.SaveChangesAsync() > 0
                ? Ok()
                : BadRequest(new ProblemDetails { Title = "Failed to remove from cart" });
        }

        private static CartDTO ToCartDTO(Cart cart)
        {
            return new CartDTO
            {
                Id = cart.Id,
                CustomerId = cart.CustomerId,
                Items = cart.Items.Select(i => new CartItemDTO
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Price = i.Product.Price,
                    ImageUrl = i.Product.ImageUrl,
                    Type = i.Product.Type,
                    Brand = i.Product.Brand,
                    Quantity = i.Quantity
                }).ToList()
            };
        }

        private async Task<Cart> FindCart()
        {
            return await ctx.Carts
                .Include(c => c.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);
        }

        private Cart Cart()
        {
            var customerId = Guid.NewGuid().ToString();
            var options = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            
            Response.Cookies.Append("customerId", customerId, options);

            var cart = new Cart { CustomerId = customerId };
            ctx.Carts.Add(cart);
            return cart;
        }
    }
}