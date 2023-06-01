import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.ts";
import { Link } from "react-router-dom";

export default function Cart(){
  const { items, removeFromCart, clearCart } = useContext(CartContext);

  if (items?.length === 0) {
    return (
      <>
        <div className="noItem">
          No items in cart. <Link to="/"><button className="buy">Buy Now</button></Link>
        </div>
      </>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Item</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            return (
              <tr key={item.item + item.option.size}>
                <td>{index + 1}</td>
                <td>{item.item}</td>
                <td>{item.option.size}</td>
                <td>$ {item.option.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>$ {(item.option.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button
                    className="remove"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total">
        <div className="totalPrice">
          Total Price: ${" "}
          {items
            .reduce((prev, curr) => {
              return curr.option.price * curr.quantity + prev;
            }, 0)
            .toFixed(2)}
        </div >
        <button className="clear" onClick={clearCart}>
          Clear Cart
        </button>
        <Link to="/">
          <button className="more">Add More Items</button>
        </Link>
      </div>
    </>
  );
}
