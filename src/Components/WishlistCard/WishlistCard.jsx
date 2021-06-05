import "./WishlistCard.scss";
import { useState } from "react";
import { useProduct } from "../../context/productProvider";
import { useAuth } from "../../context/AuthProvider";
import { BiTrash } from "react-icons/bi";
import { FiShoppingCart, FiBookmark } from "react-icons/fi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import EmptyCart from "../EmptyCart/EmptyCart";
import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";

function WishlistCard() {
  const { wishlist, cart, dispatch } = useProduct();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const itemInCart = id => {
    return cart.map(item => item.product._id).includes(id);
  };

  const removeWishlistHandler = async (product, event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await axios.delete(
      `https://prerogative-store.herokuapp.com/wishlist/${user._id}/${product._id}`
    );
    setLoading(false);
    if (data.success) {
      dispatch({ type: "REMOVE_WISHLIST", payload: product });
    } else {
      alert("error - can't delete item");
    }
  };

  const moveToCartHandler = async (product, event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await axios.post(
      `https://prerogative-store.herokuapp.com/cart/${user._id}/${product.product._id}`
    );
    setLoading(false);
    if (data.success) {
      removeWishlistHandler(product, event);
      dispatch({ type: "SET_CART", payload: data.response.cartItems });
    }
  };

  return (
    <div className="wishlist-container">
      {loading && <ScreenLoader circleSpinner bgLight />}
      <div className="wishlist-card-wrapper">
        <div className="wishlist-page-heading">
          <p className="wishlist-page-heading-text">Wishlist</p>
          <FiBookmark className="wishlist-page-icon"></FiBookmark>
        </div>
        {wishlist.length > 0 ? (
          wishlist.map(item => {
            return (
              <Link
                key={item.product._id}
                className="wishlist-card-link"
                to={{ pathname: `/product-detail/${item.product._id}` }}
              >
                <div className="wishlist-card" key={item.product._id}>
                  <div className="wishlist-product-info-wrapper">
                    <div className="wishlist-img-div">
                      <img
                        className="wishlist-card-img"
                        src={item.product.image}
                        alt=""
                      />
                    </div>
                    <div className="wishlist-product-info">
                      <div className="wishlist-brand">
                        <p className="wishlist-brand-text">
                          {" "}
                          {item.product.brand}{" "}
                        </p>

                        <div className="wishlist-price-box">
                          <p className="wishlist-card-price">
                            ${item.product.price}
                          </p>
                        </div>
                      </div>
                      <p className="wishlist-item-name">
                        {" "}
                        {item.product.name}{" "}
                      </p>

                      <div className="wishlist-size">
                        <div className="wishlist-size-box">
                          <p className="wishlist-size-text">Size : </p>
                          <div className="wishlist-size-button">
                            {item.product.selectedSize
                              ? item.product.selectedSize
                              : "S"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wishlist-btn-box">
                    <button
                      onClick={event => removeWishlistHandler(item, event)}
                      className="wishlist-remove-btn"
                    >
                      <BiTrash className="wishlist-btn-icon"></BiTrash>
                      Remove
                    </button>
                    {!item.product.inStock ? (
                      <button
                        disabled={!item.product.inStock && true}
                        style={{
                          color: "#1f1f1f",
                          opacity: "0.8",
                          fontWeight: "500"
                        }}
                        className="wishlist-wishlist-btn"
                      >
                        Out Of Stock
                      </button>
                    ) : itemInCart(item.product._id) ? (
                      <Link className="cart-link" to="/cart">
                        <button className="wishlist-wishlist-btn">
                          Go To Cart
                          <AiOutlineArrowRight className="wishlist-btn-icon-arrow"></AiOutlineArrowRight>
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={event => moveToCartHandler(item, event)}
                        className="wishlist-wishlist-btn"
                      >
                        <FiShoppingCart className="wishlist-btn-icon"></FiShoppingCart>
                        Move To Cart
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="empty-wishlist-wrapper">
            <EmptyCart />
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistCard;
