using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Cart
    {
        public int Id { get; set; }
        public string CustomerId { get; set; }
        public List<CartItem> Items { get; set; } = new();

        public void Add(Product product, int quantity)
        {
            var item = ById(product.Id);

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
            var item = ById(id);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity <= 0) Items.Remove(item);
        }

        private CartItem ById(int id)
        {
            return Items.FirstOrDefault(i => i.ProductId == id);
        }
    }
}