import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const delivery = cart.length > 0 ? 40 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <h2 style={{ padding: "20px" }}>
        Your cart is empty 🛒
      </h2>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-left">
        <h1>Checkout ({cart.length} item)</h1>

        <div className="checkout-section">
          <h3>1️⃣ Delivery address</h3>
          <p>
            Annmary <br />
            Pala, Kerala <br />
            India – 686575
          </p>
        </div>

        <div className="checkout-section">
          <h3>2️⃣ Choose a payment method</h3>
          <p>Cash on Delivery (COD)</p>
        </div>

        <div className="checkout-section">
          <h3>3️⃣ Review items</h3>

          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.title} />
              <div>
                <p className="title">{item.title}</p>
                <p className="price">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-right">
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="row">
            <span>Items:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="row">
            <span>Delivery:</span>
            <span>₹{delivery}</span>
          </div>

          <hr />

          <div className="row total">
            <span>Order Total:</span>
            <span>₹{total}</span>
          </div>

          {/* ✅ THIS BUTTON MUST GO TO PAYMENT */}
          <button
            className="place-order-btn"
            onClick={() => navigate("/payment")}
          >
            Place your order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
