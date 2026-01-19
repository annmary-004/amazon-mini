import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/orders/${orderId}`
        );
        const data = await res.json();
        setOrder(data);
      } catch {
        alert("Order not found");
        navigate("/orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, navigate]);

  const cancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) return;

    try {
      setCancelLoading(true);
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
      });
      setOrder({ ...order, status: "Cancelled" });
    } catch {
      alert("Unable to cancel order");
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) return <h2 style={{ padding: "20px" }}>Loading order…</h2>;
  if (!order) return null;

  return (
    <div className="order-details-page">
      <h1>Your Order</h1>

      <div className="order-card">
        {/* HEADER */}
        <div className="order-header">
          <div>
            <p><b>ORDER #</b> {order._id}</p>
            <p className="order-date">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <span className={`status ${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>

        {/* TRACKING */}
        <div className="tracking-bar">
          <span className={order.status !== "Cancelled" ? "active" : ""}>
            Order Placed
          </span>
          <span className={order.status === "Shipped" ? "active" : ""}>
            Shipped
          </span>
          <span className={order.status === "Delivered" ? "active" : ""}>
            Delivered
          </span>
          {order.status === "Cancelled" && (
            <span className="cancelled">Cancelled</span>
          )}
        </div>

        {/* ADDRESS */}
        <div className="section">
          <h3>Shipping Address</h3>
          <p>{order.address.name}</p>
          <p>{order.address.street}</p>
          <p>{order.address.city}, {order.address.state}</p>
          <p>Pincode: {order.address.pincode}</p>
          <p>Phone: {order.address.phone}</p>
        </div>

        {/* ITEMS */}
        <div className="section">
          <h3>Items Ordered</h3>

          {order.items.map((item, i) => (
            <div key={i} className="item-row">
              <img
                src={item.image || "https://via.placeholder.com/120"}
                alt={item.title}
              />

              <div className="item-info">
                <p className="item-title">{item.title}</p>
                <p>Qty: {item.quantity}</p>
              </div>

              <div className="item-price">₹{item.price}</div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="order-footer">
          <div>
            <p><b>Payment Method:</b> {order.paymentMethod}</p>
            <p><b>Order Total:</b> ₹{order.total}</p>
          </div>

          {order.status === "Order Placed" && (
            <button
              className="cancel-btn"
              onClick={cancelOrder}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Cancelling…" : "Cancel Order"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;