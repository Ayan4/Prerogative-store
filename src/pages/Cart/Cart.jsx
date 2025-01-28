import Navbar from "../../Components/Navbar/Navbar";
import CartContainer from "../../Components/CartCard/CartContainer";
import "./Cart.scss";

function Cart() {
  return (
    <>
      <Navbar />
      <div className="cart-item-list">
        <CartContainer />
      </div>
    </>
  );
}

export default Cart;
