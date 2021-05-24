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
import { useProduct } from "../../context/product-context";

function ProductDetails() {
  const [activeSize, setActiveSize] = useState(null);
  const [wishlistActive, setWishlistActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [cartActive, setCartActive] = useState(false);
  const { productID } = useParams();
  const navigate = useNavigate();
  const { cart, wishlist, dispatch } = useProduct();

  const {
    _id,
    name,
    image,
    price,
    brand,
    inStock,
    size,
    fastDelivery
  } = product;

  useEffect(() => {
    const getProductById = async () => {
      setLoading(true);
      const response = await axios.get(
        `https://Prerogative-store.ayanshukla.repl.co/products/${productID}`
      );
      setProduct(response.data);
      setLoading(false);
    };
    getProductById();

    cart.map(item => item.product._id === _id && setCartActive(true));
    wishlist.map(item => item.product._id === _id && setWishlistActive(true));
  }, [productID, cart, wishlist, _id]);

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
    if (cartActive) {
      navigate("/cart");
    } else {
      setLoading(true);
      const { data } = await axios.post(
        `https://Prerogative-store.ayanshukla.repl.co/cart/${_id}`
      );
      setLoading(false);
      if (data.success) {
        dispatch({ type: "ADDTOCART", payload: data.product });
        // setCartActive(true);
      } else {
        console.log(data.msg);
      }
    }
  };

  const wishlistHandler = async () => {
    if (wishlistActive) {
      navigate("/wishlist");
    } else {
      setLoading(true);
      const { data } = await axios.post(
        `https://Prerogative-store.ayanshukla.repl.co/wishlist/${_id}`
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
    <>
      {loading ? (
        <ScreenLoader circleSpinner bgLight />
      ) : (
        <div className="product-details">
          <div key={_id} className="flexbox-wrapper">
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
                <p className="product-details-category">suits</p>
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

              <p className="product-details-description">
                Navy blue solid formal blazer, has a notched lapel collar, long
                sleeves, single-breasted with buttons.
              </p>

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
