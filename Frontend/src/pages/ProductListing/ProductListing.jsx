import Navbar from "../../Components/Navbar/Navbar";
import Filter from "../../Components/Filter/Filter";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Categories from "../../Components/Categories/Categories";
import Sort from "../../Components/Sort/Sort";
import "./ProductListing.scss";
import { useProduct } from "../../context/product-context";

function ProductListing() {
  const {
    products,
    // wishlist,
    sortBy,
    showFastDelivery,
    showOutOfStock,
    dispatch
  } = useProduct();

  const getFilteredData = (productsArr, showFastDelivery, showOutOfStock) => {
    return productsArr
      .filter(item => (showFastDelivery ? item.fastDelivery : true))
      .filter(item => (!showOutOfStock ? item.inStock : true));
  };

  const getSortedData = (productsArr, sortBasis) => {
    if (sortBasis === "Low To High") {
      productsArr.sort((a, b) => a.price - b.price);
    }

    if (sortBasis === "High To Low") {
      productsArr.sort((a, b) => b.price - a.price);
    }

    return productsArr;
  };

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(
    sortedData,
    showFastDelivery,
    showOutOfStock
  );

  return (
    <div className="product-listing">
      <Navbar />
      <div className="products-wrapper">
        <div className="categories-box">
          <Categories />
        </div>
        <div className="products-box">
          <div className="toolbar">
            <Filter />
            <Sort />
          </div>
          <div className="products">
            {filteredData.map(item => (
              <ProductCard
                key={item._id}
                productData={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
