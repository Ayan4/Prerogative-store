import "./CartCard.scss";
import { useProduct } from "../../context/productProvider";
import { Link } from "react-router-dom";
import { BiTrash, BiPlus, BiMinus } from "react-icons/bi";
import { FiBookmark } from "react-icons/fi";
import { AiOutlineArrowLeft } from "react-icons/ai";
import EmptyCart from "../EmptyCart/EmptyCart";
import { apiClient } from "../../Api/axios.instance";

function CartCard({ setLoading }) {
  const { cart, wishlist, dispatch } = useProduct();

  const itemInWishlist = id => {
    return wishlist.map(item => item.product._id).includes(id);
  };

  const updateQuantityHandler = async (type, cartItem, event) => {
    event.preventDefault();
    if (type === "decrease") {
      if (cartItem.quantity > 1) {
        setLoading(true);
        const response = await apiClient.patch(`/cart/${cartItem._id}`, {
          quantity: cartItem.quantity - 1
        });
        setLoading(false);
        if (response.data.success) {
          dispatch({ type: "DECREASE", payload: cartItem._id });
        } else {
          console.log(response.data.msg);
        }
      } else {
        setLoading(true);
        const response = await apiClient.delete(`/cart/${cartItem._id}`);
        setLoading(false);
        if (response.data.success) {
          dispatch({ type: "REMOVE_CART", payload: cartItem });
        }
      }
    } else {
      setLoading(true);
      const response = await apiClient.patch(`/cart/${cartItem._id}`, {
        quantity: cartItem.quantity + 1
      });
      setLoading(false);
      if (response.data.success) {
        dispatch({ type: "INCREASE", payload: cartItem._id });
      } else {
        console.log(response.data.msg);
      }
    }
  };

  const removeCartHandler = async (cartItem, event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await apiClient.delete(`/cart/${cartItem._id}`);
    setLoading(false);
    if (data.success) {
      dispatch({ type: "REMOVE_CART", payload: cartItem });
    } else {
      console.log(data.msg);
    }
  };

  const moveToWishlistHandler = async (product, event) => {
    event.preventDefault();
    setLoading(true);
    const { data } = await apiClient.post(`/wishlist/${product.product._id}`);
    setLoading(false);
    if (data.success) {
      dispatch({ type: "SET_WISHLIST", payload: data.wishlist.wishlistItems });
      removeCartHandler(product, event);
    }
  };

  return (
    <>
      {cart.length > 0 ? (
        cart.map(item => {
          return (
            <Link
              className="cart-card-link"
              key={item.product._id}
              to={{ pathname: `/product-detail/${item.product._id}` }}
            >
              <div className="cart-card">
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
                        <p className="cart-card-price">₹{item.product.price}</p>
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
                          onClick={event =>
                            updateQuantityHandler("decrease", item, event)
                          }
                          className="cart-decrease-item cart-quantity-btn"
                        >
                          <BiMinus className="cart-quantity-icon"></BiMinus>
                        </button>
                        <p className="cart-item-quantity">{item.quantity}</p>
                        <button
                          onClick={event =>
                            updateQuantityHandler("increase", item, event)
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
                    onClick={event => removeCartHandler(item, event)}
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
                      onClick={event => moveToWishlistHandler(item, event)}
                      className="cart-wishlist-btn"
                    >
                      <FiBookmark className="cart-btn-icon"></FiBookmark>
                      Move To Wishlist
                    </button>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="empty-cart-wrapper">
          <EmptyCart cart />
        </div>
      )}
    </>
  );
}

export default CartCard;
