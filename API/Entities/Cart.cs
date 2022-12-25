using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string customerId { get; set; }
        public List<CartItem> Items { get; set; } = new();

        public void Add(Product product, int quantity)
        {
            var item = byId(product.Id);

            if (item == null) 
                Items.Add(new CartItem
                {
                    Product = product,
                    Quantity = quantity
                });
            else item.Quantity += quantity;
        }

        public void Remove(int id, int quantity)
        {
            var item = byId(id);
            if (item != null) item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);
        }

        private CartItem byId(int id)
        {
            return Items.FirstOrDefault(i => i.ProductId == id);
        }
    }
}