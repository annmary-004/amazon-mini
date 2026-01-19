import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="success-wrapper">
      <div className="success-card">

        {/* CHECK ICON */}
        <div className="success-icon">✓</div>

        {/* TITLE */}
        <h1>Your order has been placed</h1>

        <p className="success-text">
          Thank you for shopping with Amazon.
        </p>

        <p className="success-subtext">
          We’ve sent you an email confirmation with your order details.
        </p>

        {/* ACTION BUTTONS */}
        <div className="success-buttons">
          <button
            className="btn-primary"
            onClick={() => navigate("/orders")}
          >
            View your orders
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigate("/")}
          >
            Continue shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;