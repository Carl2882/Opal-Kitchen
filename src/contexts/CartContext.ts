import {createContext} from "react";
import {Cart, CartItem, MenuOption} from "../types/types.ts";


export const CartContext = createContext<Cart>({
    items: [],
    addToCart: (_:string, __: MenuOption, ___: number) => {},
    clearCart: () => {},
    removeFromCart: (_: CartItem) => {}
});