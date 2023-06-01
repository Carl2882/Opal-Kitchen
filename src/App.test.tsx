import App from './App';
import {render, screen, fireEvent} from "@testing-library/react";
import {CartContext} from "./contexts/CartContext.ts";
import MenuItem from "./components/MenuItem.tsx";
import {vi} from "vitest";

describe("should create food vendor", () => {

  it('render three items on the interface', () => {
    render(<App />);
    const products = screen.getAllByText(/add to cart/i);
    expect(products).toHaveLength(3);
  });

  it('Should change option', () => {
    const addToCart = vi.fn();
    render(
        <CartContext.Provider value={{
          items: [],
          addToCart: addToCart,
          clearCart: vi.fn(),
          removeFromCart: vi.fn()
        }}>
          <MenuItem menu={{
            item: "Chicken Burger",
            options: [
              {
                size: 'regular',
                price: 20
              }
            ]
          }} />
        </CartContext.Provider>
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    expect(addToCart).toHaveBeenCalledTimes(1);

  });

})
