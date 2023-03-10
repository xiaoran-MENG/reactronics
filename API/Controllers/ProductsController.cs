using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly ReactronicsContext cxt;

        public ProductsController(ReactronicsContext cxt)
        {
            this.cxt = cxt;
        }
 
        [HttpGet]
        public async Task<ActionResult<List<Product>>> All(string orderBy)
        {
            return await cxt.Products
                .Sort(orderBy)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> ById(int id)
        {
            var x = await cxt.Products.FindAsync(id);
            return x == null ? NotFound() : x;
        }
    }
}