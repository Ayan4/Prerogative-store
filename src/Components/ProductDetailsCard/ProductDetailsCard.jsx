import "./ProductDetailsCard.scss";
import { useState, useEffect } from "react";
import { FiBookmark } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BiCloset } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";
import axios from "axios";
import fastDeliveryIcon from "../../assets/icons/fast-delivery.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../context/productProvider";
import { useAuth } from "../../context/AuthProvider";

function ProductDetails() {
  const [activeSize, setActiveSize] = useState(null);
  const [wishlistActive, setWishlistActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [cartActive, setCartActive] = useState(false);
  const { productID } = useParams();
  const navigate = useNavigate();
  const { products, cart, wishlist, dispatch } = useProduct();
  const { user } = useAuth();

  const {
    _id,
    name,
    image,
    price,
    brand,
    inStock,
    size,
    description,
    category,
    fastDelivery
  } = product;

  useEffect(() => {
    const foundProduct = products.find(item => item._id === productID);
    setProduct(foundProduct);

    cart.map(item => item.product._id === _id && setCartActive(true));
    wishlist.map(item => item.product._id === _id && setWishlistActive(true));

    return () => {
      setActiveSize(false);
      setWishlistActive(false);
    };
  }, [productID, products, _id, cart, wishlist]);

  const sizeHandler = async size => {
    setLoading(true);
    const { data } = await axios.post(
      `https://Prerogative-store.ayanshukla.repl.co/products/${_id}`,
      {
        selectedSize: size
      }
    );
    setLoading(false);
    if (data.response.selectedSize === size) {
      setActiveSize(data.response.selectedSize);
    }
  };

  const cartHandler = async () => {
    if (user) {
      if (cartActive) {
        navigate("/cart");
      } else {
        setLoading(true);
        const { data } = await axios.post(
          `https://Prerogative-store.ayanshukla.repl.co/cart/${user.id}/${_id}`
        );
        setLoading(false);
        if (data.success) {
          dispatch({ type: "SET_CART", payload: data.response.cartItems });
          // setCartActive(true);
        } else {
          console.log(data.msg);
        }
      }
    } else {
      navigate("/login");
    }
  };

  const wishlistHandler = async () => {
    if (user) {
      if (wishlistActive) {
        navigate("/wishlist");
      } else {
        setLoading(true);
        const { data } = await axios.post(
          `https://Prerogative-store.ayanshukla.repl.co/wishlist/${user.id}/${_id}`
        );
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
    <>
      {loading ? (
        <ScreenLoader circleSpinner bgLight />
      ) : (
        <div className="product-details">
          <div className="flexbox-wrapper">
            <div className="flexbox-left-box">
              <div className="product-img-wrapper">
                {!inStock && (
                  <div className="out-of-stock-message">
                    <BiCloset className="hanger-icon" />
                    <p>Currently Out Of Stock</p>
                  </div>
                )}
                <img
                  className={
                    !inStock
                      ? "product-details-img out-of-stock-img"
                      : "product-details-img"
                  }
                  src={image}
                  alt=""
                />
              </div>
            </div>
            <div className="flexbox-right-box">
              <div className="product-details-name">
                <p className="product-details-category">{category}</p>
                <p className="product-details-title">
                  <span className="product-details-brand">{brand} </span> {name}
                </p>
              </div>
              <div className="product-details-info">
                <div className="product-details-price-box">
                  <p className="product-details-price">${price}</p>
                  <p className="product-details-price-strike">${price}</p>
                </div>
                {fastDelivery && <img src={fastDeliveryIcon} alt="" />}
              </div>

              <div className="product-details-size">
                <p className="product-details-size-heading">Select Size</p>
                <div className="size-btn-box">
                  {size?.map(sizeItem => {
                    return (
                      <button
                        key={sizeItem}
                        onClick={() => sizeHandler(sizeItem)}
                        className={
                          activeSize === sizeItem
                            ? "size-btn size-btn-selected"
                            : "size-btn"
                        }
                      >
                        {sizeItem}
                      </button>
                    );
                  })}
                </div>
              </div>

              <p className="product-details-description">{description}</p>

              <div className="product-details-btns">
                <button onClick={wishlistHandler} className="wishlist-btn">
                  {!wishlistActive ? (
                    <p>
                      <FiBookmark className="product-details-wishlist-icon"></FiBookmark>
                      wishlist
                    </p>
                  ) : (
                    <p>
                      <FiBookmark className="product-details-wishlist-icon fill"></FiBookmark>
                      wishlisted
                    </p>
                  )}
                </button>
                <button
                  disabled={!inStock && true}
                  onClick={cartHandler}
                  className="cart-btn"
                >
                  {!inStock ? (
                    <p>Out Of Stock</p>
                  ) : !cartActive ? (
                    <p>
                      <FiShoppingCart className="product-details-cart-icon"></FiShoppingCart>
                      Add To Cart
                    </p>
                  ) : (
                    <p>
                      Go To Cart
                      <AiOutlineArrowRight className="product-details-cart-icon arrow"></AiOutlineArrowRight>
                    </p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
