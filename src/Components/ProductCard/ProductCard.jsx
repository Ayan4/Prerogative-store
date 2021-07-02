import "./ProductCard.scss";
import { FiBookmark, FiShoppingCart } from "react-icons/fi";
import { BiPlus, BiCloset } from "react-icons/bi";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/productProvider";
import { useAuth } from "../../context/AuthProvider";
// import axios from "axios";
import { apiClient } from "../../Api/axios.instance";

function ProductCard({ productData, dispatch }) {
  const [wishlistActive, setWishlistActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cartActive, setCartActive] = useState(false);
  const navigate = useNavigate();
  const { cart, wishlist } = useProduct();
  const { user } = useAuth();

  useEffect(() => {
    cart.map(item => item._id === productData._id && setCartActive(true));

    wishlist.map(
      item => item._id === productData._id && setWishlistActive(true)
    );
  }, [cart, wishlist, productData._id]);

  const cartBtnHandler = async event => {
    event.preventDefault();
    if (user) {
      if (cartActive) {
        navigate("/cart");
      } else {
        setLoading(true);
        // const { data } = await axios.post(
        //   `https://prerogative-store.herokuapp.com/cart/${user._id}/${productData._id}`
        // );
        const { data } = await apiClient.post(`/cart/${productData._id}`);
        setLoading(false);
        if (data.success) {
          setCartActive(true);
          dispatch({ type: "SET_CART", payload: data.response.cartItems });
        } else {
          console.log(data.msg);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const wishlistBtnHandler = async event => {
    event.preventDefault();
    if (user) {
      if (!wishlistActive) {
        setLoading(true);
        // const { data } = await axios.post(
        //   `https://prerogative-store.herokuapp.com/wishlist/${user._id}/${productData._id}`
        // );
        const { data } = await apiClient.post(`/wishlist/${productData._id}`);
        setLoading(false);
        if (data.success) {
          dispatch({
            type: "SET_WISHLIST",
            payload: data.wishlist.wishlistItems
          });
          setWishlistActive(true);
        } else {
          console.log(data.msg);
        }
      }
    } else {
      navigate("/login");
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
            <p className="product-category">{productData.category}</p>
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
