import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext"; // ✅ ADD
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // ✅
  const { user } = useAuth();
  const navigate = useNavigate();

  const isInCart = cart.some(
    (item) => item._id === product._id
  );

  const isInWishlist = wishlist.some(
    (item) => item._id === product._id
  );

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  const toggleWishlist = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
      toast("Removed from Wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to Wishlist ❤️");
    }
  };

  return (
    <div className="product-card">
      {/* ❤️ WISHLIST ICON */}
      <div
        className={`wishlist-icon ${isInWishlist ? "active" : ""}`}
        onClick={toggleWishlist}
      >
        ♥
      </div>

      {/* IMAGE */}
      <img
        src={product.image || "https://via.placeholder.com/200"}
        alt={product.name}
        className="product-image"
        onClick={() => navigate(`/product/${product._id}`)}
      />

      {/* INFO */}
      <div className="product-info">
        <p className="product-name">{product.name}</p>

        <div className="product-rating">
          ⭐ {product.rating || 4.2}
        </div>

        <p className="product-price">₹{product.price}</p>
      </div>

      {/* ADD TO CART */}
      <button
        onClick={handleAddToCart}
        disabled={isInCart}
        className={`add-btn ${isInCart ? "disabled" : ""}`}
      >
        {isInCart ? "Added" : "Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;