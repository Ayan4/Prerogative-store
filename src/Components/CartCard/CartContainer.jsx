import "./CartContainer.scss";
import { useState } from "react";
import { useProduct } from "../../context/productProvider";
import { FiShoppingCart } from "react-icons/fi";
import ScreenLoader from "../../pages/ScreenLoader/ScreenLoader";
import CartCard from "./CartCard";
import { apiClient } from "../../Api/axios.instance";
import { useAuth } from "../../context/AuthProvider";

const loadScript = src => {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

function CartContainer() {
  const { cart } = useProduct();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const displayRazorpay = async () => {
    setLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load");
      setLoading(false);
      return;
    }

    const { data } = await apiClient.post("/checkout", { total: cartTotalSum });
    if (data) {
      setLoading(false);
      const options = {
        key: "rzp_test_YHRpE8Pc7k6GDy",
        amount: data.amount.toString(),
        currency: data.currency,
        name: "Prerogative Store",
        description: "Place Order",
        image: "https://example.com/your_logo",
        order_id: data.id,
        handler: function(response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: user.name,
          email: `${user.name}@gmail.com`,
          contact: "9999999999"
        }
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  };

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
            <p className="cart-total-amount">₹{cartTotalSum}</p>
          </div>
          <button onClick={displayRazorpay} className="place-order">
            Place Order
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CartContainer;
