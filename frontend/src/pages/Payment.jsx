import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Payment.css";

function Payment() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");

  /* =========================
     AUTH & CART CHECK
  ========================= */
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      navigate("/cart");
    }
  }, [user, cart, navigate]);

  if (!user || cart.length === 0) return null;

  /* =========================
     CALCULATIONS (FIXED)
  ========================= */
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const delivery = 40;
  const total = subtotal + delivery;

  /* =========================
     CONTINUE TO REVIEW
  ========================= */
  const handlePayment = () => {
    navigate("/review-order", {
      state: {
        paymentMethod,
        subtotal,
        delivery,
        total,
      },
    });
  };

  return (
    <div className="payment-page">
      <div className="payment-container">

        {/* LEFT SIDE */}
        <div className="payment-left">
          <h1>Select a payment method</h1>

          <div className="payment-option">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "COD"}
              onChange={() => setPaymentMethod("COD")}
            />
            <label>Cash on Delivery</label>
          </div>

          <div className="payment-option">
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === "UPI"}
              onChange={() => setPaymentMethod("UPI")}
            />
            <label>UPI / Debit / Credit Card (Demo)</label>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="payment-right">
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
            <strong>Order Total:</strong>
            <strong>₹{total}</strong>
          </div>

          <button className="pay-btn" onClick={handlePayment}>
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payment;