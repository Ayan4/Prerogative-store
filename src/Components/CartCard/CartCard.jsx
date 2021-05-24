import "./CartCard.scss";
import { useState } from "react";
import { useProduct } from "../../context/product-context";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import { FiBookmark, FiShoppingCart } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EmptyCart from "../EmptyCart/EmptyCart";
import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";
import { Link } from "react-router-dom";
import axios from "axios";

function CartCard() {
  const { cart, wishlist, dispatch } = useProduct();
  const [loading, setLoading] = useState(false);

  const itemInWishlist = id => {
    return wishlist.map(item => item.product._id).includes(id);
  };

  const cartTotal = cart.map(item => {
    const totalArr = item.quantity * item.product.price;
    return totalArr;
  });

  const cartTotalSum = cartTotal.reduce((a, b) => a + b, 0);

  const removeCartHandler = async cartItem => {
    setLoading(true);
    const { data } = await axios.delete(
      `https://Prerogative-store.ayanshukla.repl.co/cart/${cartItem._id}`
    );
    setLoading(false);
    if (data.success) {
      dispatch({ type: "REMOVECART", payload: cartItem });
    } else {
      console.log(data.msg);
    }
  };

  const moveToWishlistHandler = async product => {
    setLoading(true);
    const { data } = await axios.post(
      `https://Prerogative-store.ayanshukla.repl.co/wishlist/${product.product._id}`
    );
    setLoading(false);
    if (data.success) {
      dispatch({ type: "MOVETOWISHLIST", payload: data.wishlistItem });
      removeCartHandler(product);
    }
  };

  const updateQuantityHandler = async (type, cartItem) => {
    if (type === "decrease") {
      if (cartItem.quantity > 1) {
        setLoading(true);
        const response = await axios.patch(
          `https://Prerogative-store.ayanshukla.repl.co/cart/${cartItem._id}`,
          {
            quantity: cartItem.quantity - 1
          }
        );
        setLoading(false);
        if (response.data.success) {
          dispatch({ type: "DECREASE", payload: cartItem._id });
        } else {
          console.log(response.data.msg);
        }
      } else {
        setLoading(true);
        const response = await axios.delete(
          `https://Prerogative-store.ayanshukla.repl.co/cart/${cartItem._id}`
        );
        setLoading(false);
        if (response.data.success) {
          dispatch({ type: "REMOVECART", payload: cartItem });
        }
      }
    } else {
      setLoading(true);
      const response = await axios.patch(
        `https://Prerogative-store.ayanshukla.repl.co/cart/${cartItem._id}`,
        {
          quantity: cartItem.quantity + 1
        }
      );
      setLoading(false);
      if (response.data.success) {
        dispatch({ type: "INCREASE", payload: cartItem._id });
      } else {
        console.log(response.data.msg);
      }
    }
  };

  return (
    <div className="cart-container">
      {loading && <ScreenLoader circleSpinner bgLight />}
      <div className="cart-card-wrapper">
        <div className="cart-page-heading">
          <div>
            <FiShoppingCart className="cart-page-icon"></FiShoppingCart>
            <p className="cart-page-heading-text">Cart</p>
          </div>
          <p className="cart-item-count">
            <span className="cart-item-count-figure">{cart.length}</span> Items
          </p>
        </div>

        {cart.length > 0 ? (
          cart.map(item => {
            return (
              <div className="cart-card" key={item.product._id}>
                <div className="cart-product-info-wrapper">
                  <div className="cart-img-div">
                    <img
                      className="cart-card-img"
                      src={item.product.image}
                      alt=""
                    />
                  </div>
                  <div className="cart-product-info">
                    <div className="cart-brand">
                      <p className="cart-brand-text"> {item.product.brand} </p>

                      <div className="cart-price-box">
                        <p className="cart-card-price">${item.product.price}</p>
                      </div>
                    </div>
                    <p className="cart-item-name"> {item.product.name} </p>

                    <div className="cart-size">
                      <div className="cart-size-box">
                        <p className="cart-size-text">Size : </p>
                        <div className="cart-size-button">
                          {item.product.selectedSize
                            ? item.product.selectedSize
                            : "S"}
                        </div>
                      </div>

                      <div className="cart-quantity-box">
                        <p className="cart-quantity-text">Qty : </p>
                        <button
                          onClick={() =>
                            updateQuantityHandler("decrease", item)
                          }
                          className="cart-decrease-item cart-quantity-btn"
                        >
                          <BiMinus className="cart-quantity-icon"></BiMinus>
                        </button>
                        <p className="cart-item-quantity">{item.quantity}</p>
                        <button
                          onClick={() =>
                            updateQuantityHandler("increase", item)
                          }
                          className="cart-increase-item cart-quantity-btn"
                        >
                          <BiPlus className="cart-quantity-icon"></BiPlus>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-btn-box">
                  <button
                    onClick={() => removeCartHandler(item)}
                    className="cart-remove-btn"
                  >
                    <BiTrash className="cart-btn-icon"></BiTrash>
                    Remove
                  </button>
                  {itemInWishlist(item.product._id) ? (
                    <Link to="/wishlist" className="wishlist-link">
                      <button className="cart-wishlist-btn">
                        <AiOutlineArrowLeft className="cart-btn-icon-arrow"></AiOutlineArrowLeft>
                        Go To Wishlist
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => moveToWishlistHandler(item)}
                      className="cart-wishlist-btn"
                    >
                      <FiBookmark className="cart-btn-icon"></FiBookmark>
                      Move To Wishlist
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-cart-wrapper">
            <EmptyCart cart />
          </div>
        )}
      </div>
      {cart.length > 0 ? (
        <div className="cart-total-box">
          <div className="cart-total-info">
            <p className="cart-total-text">Cart Total</p>
            <p className="cart-total-amount">${cartTotalSum}</p>
          </div>
          <button className="place-order">Place Order</button>
        </div>
      ) : null}
    </div>
  );
}

export default CartCard;
