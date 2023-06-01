import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.ts";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useContext(CartContext);

  if (items?.length === 0) {
    return (
      <>
        <div className="noItem">
          No items in cart.{" "}
          <Link to="/">
            <button className="buy">Buy Now</button>
          </Link>
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      {" "}
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />{" "}
                    </svg>
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
        </div>
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
