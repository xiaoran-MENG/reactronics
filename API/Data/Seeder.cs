using System.Collections.Generic;
using System.Linq;
using API.Entities;

namespace API.Data
{
    public static class Seeder
    {
        public static void seed(ReactronicsContext context) 
        {
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Personal Laptop",
                    Description = "Personal Laptop Description",
                    Price = 159999,
                    Type = "Computer",
                    Brand = "Apple",
                    ImageUrl = "/images/laptop1.png"
                },
                new Product
                {
                    Name = "Personal Laptop",
                    Description = "Personal Laptop Description",
                    Price = 159999,
                    Type = "Computer",
                    Brand = "Google",
                    ImageUrl = "/images/laptop2.png"
                },
                new Product
                {
                    Name = "Personal Laptop",
                    Description = "Personal Laptop Description",
                    Price = 159999,
                    Type = "Computer",
                    Brand = "Microsoft",
                    ImageUrl = "/images/laptop3.png"
                },
                new Product
                {
                    Name = "Personal Phone",
                    Description = "Personal Phone Description",
                    Price = 1599,
                    Type = "Phone",
                    Brand = "Apple",
                    ImageUrl = "/images/phone1.png"
                },
                new Product
                {
                    Name = "Personal Phone",
                    Description = "Personal Phone Description",
                    Price = 1599,
                    Type = "Phone",
                    Brand = "Google",
                    ImageUrl = "/images/phone2.png"
                },
                new Product
                {
                    Name = "Personal Phone",
                    Description = "Personal Phone Description",
                    Price = 1599,
                    Type = "Phone",
                    Brand = "Microsoft",
                    ImageUrl = "/images/phone3.png"
                }
            };
            
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}