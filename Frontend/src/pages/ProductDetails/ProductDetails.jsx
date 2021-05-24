import Navbar from "../../Components/Navbar/Navbar";
import ProductDetailsCard from "../../Components/ProductDetailsCard/ProductDetailsCard";
import "./ProductDetails.scss";

function ProductDetails() {
  return (
    <div className="product-details">
      <Navbar />
      <ProductDetailsCard />
    </div>
  );
}

export default ProductDetails;
