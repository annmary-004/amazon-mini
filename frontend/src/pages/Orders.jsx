import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

// ✅ BACKEND URL FROM ENV
const API_URL = import.meta.env.VITE_API_URL;

function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/orders/user/${user.uid}`
        );
        const data = await res.json();

        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("FETCH ORDERS ERROR:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <h2 className="orders-loading">Loading your orders...</h2>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h1>Your Orders</h1>
        <p className="orders-empty">
          You haven’t placed any orders yet.
        </p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          {/* HEADER */}
          <div className="order-header">
            <div>
              <span className="label">ORDER ID</span>
              <p>{order._id}</p>
            </div>

            <div>
              <span className="label">STATUS</span>
              <p className={`status ${order.status.replaceAll(" ", "-")}`}>
                {order.status}
              </p>
            </div>
          </div>

          <p className="order-date">
            Ordered on {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div key={i} className="order-item">
              <img
                src={item.image || "https://via.placeholder.com/100"}
                alt={item.title}
              />
              <div>
                <p className="item-title">{item.title}</p>
                <p className="item-price">₹{item.price}</p>
              </div>
            </div>
          ))}

          {/* FOOTER */}
          <div className="order-footer">
            <p><b>Payment:</b> {order.paymentMethod}</p>
            <p><b>Total:</b> ₹{order.total}</p>

            <button
              className="order-btn"
              onClick={() => navigate(`/orders/${order._id}`)}
            >
              View Order Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;