import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./ReviewOrder.css";

function ReviewOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  // 🔐 SAFETY CHECK
  if (!state || !user) {
    navigate("/payment");
    return null;
  }

  const { paymentMethod, subtotal, delivery, total } = state;

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = async () => {
    // BASIC VALIDATION
    if (
      !address.name ||
      !address.phone ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all required address fields");
      return;
    }

    setLoading(true);

    // ✅ BACKEND COMPATIBLE ITEMS
    const orderItems = cart.map((item) => ({
      title: item.name,
      price: item.price,
      image: item.image,
      quantity: item.qty,
    }));

    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/place",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.uid,
            email: user.email,
            address,
            items: orderItems,
            paymentMethod,
            subtotal,
            delivery,
            total,
          }),
        }
      );

      if (!res.ok) throw new Error("Order failed");

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert("Order failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page">
      <div className="review-container">

        {/* LEFT */}
        <div className="review-left">
          <h2>Review your order</h2>

          <div className="box">
            <h3>Delivery address</h3>

            <input placeholder="Full Name"
              onChange={e => setAddress({ ...address, name: e.target.value })} />

            <input placeholder="Mobile Number"
              maxLength="10"
              onChange={e => setAddress({ ...address, phone: e.target.value })} />

            <input placeholder="Street / Area"
              onChange={e => setAddress({ ...address, street: e.target.value })} />

            <input placeholder="Landmark (optional)"
              onChange={e => setAddress({ ...address, landmark: e.target.value })} />

            <input placeholder="City"
              onChange={e => setAddress({ ...address, city: e.target.value })} />

            <input placeholder="State"
              onChange={e => setAddress({ ...address, state: e.target.value })} />

            <input placeholder="Pincode"
              maxLength="6"
              onChange={e => setAddress({ ...address, pincode: e.target.value })} />
          </div>

          <div className="box">
            <h3>Items</h3>

            {cart.map(item => (
              <div key={item._id} className="item-row">
                <img src={item.image} alt={item.name} />
                <div>
                  <p className="item-title">{item.name}</p>
                  <p>Qty: {item.qty}</p>
                  <p className="item-price">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="review-right">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Items:</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery:</span>
            <span>₹{delivery}</span>
          </div>

          <hr />

          <div className="summary-total">
            <span>Order Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            className="place-btn"
            onClick={handlePlaceOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place your order"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReviewOrder;