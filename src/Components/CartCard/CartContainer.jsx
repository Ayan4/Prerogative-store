import "./CartContainer.scss";
import { useState, useEffect } from "react";
import { useProduct } from "../../context/productProvider";
import { FiShoppingCart } from "react-icons/fi";
import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";
import CartCard from "./CartCard";
import { useNavigate } from "react-router";

function CartContainer() {
  const { cart } = useProduct();
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCheckout(false);
  }, []);

  checkout && navigate("/checkout");

  const cartTotal = cart.map(item => {
    const totalArr = item.quantity * item.product.price;
    return totalArr;
  });

  const cartTotalSum = cartTotal.reduce((a, b) => a + b, 0);

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

        <CartCard setLoading={setLoading} />
      </div>
      {cart.length > 0 ? (
        <div className="cart-total-box">
          <div className="cart-total-info">
            <p className="cart-total-text">Cart Total</p>
            <p className="cart-total-amount">${cartTotalSum}</p>
          </div>
          <button onClick={() => setCheckout(true)} className="place-order">
            Place Order
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CartContainer;
