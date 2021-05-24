import "./ProductCard.scss";
import { FiBookmark, FiShoppingCart } from "react-icons/fi";
import { BiPlus, BiCloset } from "react-icons/bi";
// import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/product-context";
import axios from "axios";

function ProductCard({ productData, dispatch }) {
  const [wishlistActive, setWishlistActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const navigate = useNavigate();
  const { cart, wishlist } = useProduct();

  // console.log(productData);

  useEffect(() => {
    cart.map(
      item => item.product._id === productData._id && setCartActive(true)
    );

    wishlist.map(
      item => item.product._id === productData._id && setWishlistActive(true)
    );
  }, [cart, wishlist, productData._id]);

  const cartBtnHandler = async event => {
    event.preventDefault();
    if (cartActive) {
      navigate("/cart");
    } else {
      setLoading(true);
      const { data } = await axios.post(
        `https://Prerogative-store.ayanshukla.repl.co/cart/${productData._id}`
      );
      setLoading(false);
      if (data.success) {
        setCartActive(true);
        dispatch({ type: "ADDTOCART", payload: data.product });
      } else {
        console.log(data.msg);
      }
    }
  };

  const wishlistBtnHandler = async event => {
    event.preventDefault();
    if (!wishlistActive) {
      setLoading(true);
      const { data } = await axios.post(
        `https://Prerogative-store.ayanshukla.repl.co/wishlist/${productData._id}`
      );
      setLoading(false);
      if (data.success) {
        dispatch({ type: "WISHLIST", payload: data.wishlistItem });
        setWishlistActive(true);
      } else {
        console.log(data.msg);
      }
    }
  };

  return (
    <Link
      className="product-card-link"
      to={{ pathname: `/product-detail/${productData._id}` }}
    >
      <div id={productData._id} className="product-card">
        <div className="product-img-wrapper">
          {!productData.inStock && (
            <div className="out-of-stock-message">
              <BiCloset className="hanger-icon" />
              <p>Currently Out Of Stock</p>
            </div>
          )}
          <img
            className={
              !productData.inStock
                ? "product-img out-of-stock-img"
                : "product-img"
            }
            src={productData.image}
            alt=""
          />
        </div>
        <div className="product-info">
          <div className="product-info-box">
            <p className="product-category">suits</p>
            <p className="product-brand">{productData.brand}</p>
            <p className="product-title">{productData.name}</p>
          </div>
          <div className="product-price-box">
            <FiBookmark
              onClick={wishlistBtnHandler}
              className={
                !wishlistActive
                  ? "product-card-wishlist-icon"
                  : "product-card-wishlist-icon wishlist-active"
              }
            ></FiBookmark>

            <div>
              <p className="product-price">${productData.price}</p>
              <p className="product-price-strike">${productData.price}</p>
            </div>
          </div>
        </div>
        <button
          disabled={!productData.inStock ? true : loading ? true : false}
          onClick={cartBtnHandler}
          className={
            !cartActive ? "product-addToCart-btn" : "product-go-cart-btn"
          }
        >
          {loading ? (
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : !productData.inStock ? (
            <p>Out Of Stock</p>
          ) : !cartActive ? (
            <p>
              <BiPlus className="card-btn-icon"></BiPlus> Add To Cart
            </p>
          ) : (
            <p>
              <FiShoppingCart className="card-btn-icon"></FiShoppingCart> Go To
              Cart
            </p>
          )}
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
