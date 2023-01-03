import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Cart } from "../models/cart";

interface State {
    cart: Cart | null
    setCart: (c: Cart) => void
    remove: (id: number, quantity: number) => void
}

export const ReactronicsContext = createContext<State | undefined>(undefined)

export const useReactronicsContext = () => {
    const c = useContext(ReactronicsContext)
    if (!c) throw Error("No provider");
    return c
}

export const ReactronicsContextProvider = ({ children }: PropsWithChildren<any>) => {
    const [cart, setCart] = useState<Cart | null>(null)

    const remove = (id: number, quantity: number) => {
        if (!cart) return;

        const items = [...cart.items]
        const i = items.findIndex(x => x.productId === id)
        if (i < 0) return;

        items[i].quantity -= quantity;
        if (items[i].quantity <= 0) items.splice(i, 1)

        setCart(c => {
            return { ...c!, items }
        })
    }

    return <ReactronicsContext.Provider value={{
        cart,
        setCart,
        remove
    }}>{children}</ReactronicsContext.Provider>
}