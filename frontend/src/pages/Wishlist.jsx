import { useWishlist } from "../context/WishlistContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return <h2 style={{ padding: "20px" }}>Your Wishlist is empty ❤️</h2>;
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>

      {wishlist.map((item) => (
        <div key={item._id} className="wishlist-item">
          <img src={item.image} alt={item.name} />

          <div className="wishlist-info">
            <p className="title">{item.name}</p>
            <p className="price">₹{item.price}</p>

            <div className="wishlist-actions">
              <button
                onClick={() => {
                  addToCart(item);
                  removeFromWishlist(item._id);
                }}
              >
                Move to Cart
              </button>

              <button
                className="remove"
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;