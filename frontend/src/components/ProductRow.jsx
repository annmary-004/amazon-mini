import ProductCard from "./ProductCard";
import "./ProductRow.css";

function ProductRow({ title, products }) {
  return (
    <div className="product-row">
      <h2 className="row-title">{title}</h2>

      <div className="row-products">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductRow;