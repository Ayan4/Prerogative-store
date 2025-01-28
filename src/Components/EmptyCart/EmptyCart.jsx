import "./EmptyCart.scss";
import { RiShoppingCartLine } from "react-icons/ri";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BsBag } from "react-icons/bs";
import { Link } from "react-router-dom";

function EmptyCart({ cart }) {
  return (
    <div className="empty-cart">
      <div className="empty-cart-text">
        {cart ? (
          <RiShoppingCartLine className="empty-cart-icon" />
        ) : (
          <BsBag className="empty-cart-icon" />
        )}

        <h1>Your {cart ? "cart" : "wishlist"} Is Empty</h1>
      </div>
      <IoEllipsisVerticalSharp className="empty-cart-dots" />
      <Link className="empty-cart-products-btn" to="/products">
        <button>Shop Now</button>
      </Link>
    </div>
  );
}

export default EmptyCart;
