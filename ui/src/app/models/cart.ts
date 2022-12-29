export interface Cart {
    id: number
    customerId: string
    items: CartItem[]
}

export interface CartItem {
    productId: number
    name: string
    price: number
    imageUrl: string
    type: string
    brand: string
    quantity: number
}
