import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductRow from "../components/ProductRow";
import toast from "react-hot-toast";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // 🔍 READ SEARCH QUERY (?q=iphone)
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading products…</h2>;
  }

  // 🔥 AMAZON-STYLE SEARCH FILTER
  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="home">
      {/* 🔍 SEARCH RESULTS VIEW */}
      {query && (
        <>
          <h2 className="search-title">
            Results for “{query}”
          </h2>

          {filteredProducts.length === 0 ? (
            <p className="no-results">
              No results found for “{query}”
            </p>
          ) : (
            <ProductRow
              title={`Showing ${filteredProducts.length} results`}
              products={filteredProducts}
            />
          )}
        </>
      )}

      {/* 🏠 DEFAULT AMAZON HOME */}
      {!query && (
        <>
          <ProductRow
            title="Best Sellers"
            products={products.slice(0, 5)}
          />

          <ProductRow
            title="Trending Deals"
            products={products.slice(5, 10)}
          />

          <ProductRow
            title="Recommended for You"
            products={products.slice(10, 15)}
          />
        </>
      )}
    </div>
  );
}

export default Home;