import {CartContext} from "./contexts/CartContext.ts";
import {useState} from "react";
import {CartItem, MenuOption} from "./types/types.ts";
import Header from "./components/Header.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Store from "./components/Store.tsx";
import Cart from "./components/Cart.tsx";


import './App.css'

function App() {

    const [cart, setCart] = useState<CartItem[]>([]);
    const addToCart = (name: string, option: MenuOption, quantity: number) => {
        setCart(orig => {
            const newCart = [...orig];
            const existing = newCart.find(item => item.item === name && item.option.size === option.size);
            if(existing) {
                existing.quantity += quantity;
            }
            else {
                newCart.push({
                    item: name,
                    option,
                    quantity
                });
            }
            return newCart;
        })
    }

    const removeFromCart = (item: CartItem) => {
        setCart(c => {
            const result = [...c];
            const index = result.findIndex(entry => item.item === entry.item && item.option.size === entry.option.size);
            result.splice(index, 1);
            return result;
        })
    }

    const clearCart = () => {
        setCart([])
    }
    return (
        <main>
            <BrowserRouter>
                <CartContext.Provider value={{
                    items: cart,
                    addToCart,
                    removeFromCart,
                    clearCart
                }}>
                    <Header/>
                    <Routes>
                        <Route path='/checkout' Component={Cart}/>
                        <Route path='/' Component={Store}/>
                    </Routes>
                </CartContext.Provider>
            </BrowserRouter>

        </main>
    )
}

export default App
