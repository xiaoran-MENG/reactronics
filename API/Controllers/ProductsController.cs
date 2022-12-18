using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseController
    {
        private readonly ReactronicsContext c;

        public ProductsController(ReactronicsContext c)
        {
            this.c = c;
        }
 
        [HttpGet]
        public async Task<ActionResult<List<Product>>> All()
        {
            return await c.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> ById(int id)
        {
            return await c.Products.FindAsync(id);
        }
    }
}