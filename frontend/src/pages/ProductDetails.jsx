import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import ProductRow from "../components/ProductRow";
import API_BASE from "../utils/api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 🔹 SINGLE PRODUCT
        const res = await fetch(
          `${API_BASE}/api/products/${id}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);

        // 🔹 RELATED PRODUCTS
        const allRes = await fetch(
          `${API_BASE}/api/products`
        );
        const allData = await allRes.json();

        setRelated(
          allData
            .filter((p) => p._id !== data._id)
            .slice(0, 5)
        );
      } catch (err) {
        console.error(err);
        toast.error("Product not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (loading)
    return <h2 style={{ padding: 20 }}>Loading...</h2>;

  if (!product) return null;

  return (
    <>
      {/* ================= PRODUCT DETAILS ================= */}
      <div className="pdp-container">

        {/* LEFT – IMAGE */}
        <div className="pdp-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* MIDDLE – INFO */}
        <div className="pdp-info">
          <h1>{product.name}</h1>

          <div className="rating">
            ⭐ {product.rating || 4.3} | 1,200 ratings
          </div>

          <div className="prime">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/bb/Amazon_Prime_logo.svg"
              alt="Prime"
            />
            <span>FREE delivery Tomorrow</span>
          </div>

          <hr />

          <h2 className="price">₹{product.price}</h2>
          <p className="desc">{product.description}</p>

          <ul className="features">
            <li>✔ 7 Days Replacement</li>
            <li>✔ Amazon Delivered</li>
            <li>✔ Secure packaging</li>
          </ul>

          <div className="reviews">
            <h3>Customer reviews</h3>
            <p><b>Arjun:</b> Excellent product quality ⭐⭐⭐⭐☆</p>
            <p><b>Meera:</b> Fast delivery and good packaging ⭐⭐⭐⭐⭐</p>
          </div>
        </div>

        {/* RIGHT – BUY BOX */}
        <div className="pdp-buy">
          <p className="buy-price">₹{product.price}</p>
          <p className="stock">In stock</p>

          <button
            className="add-cart"
            onClick={() => {
              addToCart(product);
              toast.success("Added to cart");
            }}
          >
            Add to Cart
          </button>

          <button
            className="buy-now"
            onClick={() => {
              addToCart(product);
              navigate("/checkout");
            }}
          >
            Buy Now
          </button>

          <p className="secure">🔒 Secure transaction</p>
        </div>
      </div>

      {/* ================= RELATED ================= */}
      <div className="related">
        <ProductRow
          title="Related products"
          products={related}
        />
      </div>
    </>
  );
}

export default ProductDetails;