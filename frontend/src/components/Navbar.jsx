import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  // ✅ Show name instead of email
  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Guest";

  // ✅ Amazon-style search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/?q=${search}`);
    setSearch("");
  };

  // ✅ Logout + redirect
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ✅ Cart total quantity
  const cartCount = cart.reduce(
    (sum, item) => sum + (item.qty || 1),
    0
  );

  // ✅ Wishlist count
  const wishlistCount = wishlist.length;

  return (
    <div className="navbar">
      {/* LOGO */}
      <Link to="/" className="nav-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
        />
      </Link>

      {/* SEARCH */}
      <form className="nav-search" onSubmit={handleSearch}>
        <input
          placeholder="Search Amazon.in"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>

      {/* RIGHT SIDE */}
      <div className="nav-links">
        {/* ACCOUNT */}
        <div className="nav-item">
          <span>Hello, {userName}</span>
          <strong>Account & Lists</strong>
        </div>

        {/* WISHLIST */}
        <Link to="/wishlist" className="nav-item">
          <span>❤️ Wishlist</span>
          <strong>{wishlistCount}</strong>
        </Link>

        {/* ORDERS */}
        <Link to="/orders" className="nav-item">
          <span>Returns</span>
          <strong>& Orders</strong>
        </Link>

        {/* CART */}
        <Link to="/cart" className="nav-cart">
          🛒 <span className="cart-count">{cartCount}</span>
        </Link>

        {/* LOGOUT */}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;