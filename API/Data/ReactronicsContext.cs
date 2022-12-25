using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ReactronicsContext : DbContext
    {
        public ReactronicsContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
    }
}