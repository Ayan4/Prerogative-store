import Navbar from "../../Components/Navbar/Navbar";
import Filter from "../../Components/Filter/Filter";
import ProductCard from "../../Components/ProductCard/ProductCard";
import Categories from "../../Components/Categories/Categories";
import Sort from "../../Components/Sort/Sort";
import "./ProductListing.scss";
import { useLocation } from "react-router-dom";
import { useProduct } from "../../context/productProvider";

function ProductListing() {
  const {
    products,
    sortBy,
    showFastDelivery,
    showOutOfStock,
    dispatch
  } = useProduct();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const queryParam = useQuery().get("category");

  const getCategoryData = () => {
    if (queryParam) {
      return products.filter(item => item.category === queryParam);
    }
    return products;
  };

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

  const productsOfCategory = getCategoryData();
  const sortedData = getSortedData(productsOfCategory, sortBy);
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
