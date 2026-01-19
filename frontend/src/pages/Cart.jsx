import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cart.length === 0) {
    return <h2 className="empty-cart">Your Amazon Cart is empty</h2>;
  }

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2>Shopping Cart</h2>
        <hr />

        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} />

            <div className="cart-item-info">
              <p className="cart-title">{item.name}</p>
              <p className="cart-stock">In stock</p>

              <select
                value={item.qty}
                onChange={(e) =>
                  updateQty(item._id, Number(e.target.value))
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    Qty: {n}
                  </option>
                ))}
              </select>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item._id)}
              >
                Delete
              </button>
            </div>

            <div className="cart-price">
              ₹{item.price * item.qty}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <p>
          Subtotal ({cart.length} items):{" "}
          <strong>₹{subtotal}</strong>
        </p>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Buy
        </button>
      </div>
    </div>
  );
}

export default Cart;