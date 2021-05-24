import Navbar from "../../Components/Navbar/Navbar";
import CartCard from "../../Components/CartCard/CartCard";
import "./Cart.scss";

function Cart() {
  return (
    <>
      <Navbar />
      <div className="cart-item-list">
        <CartCard />
      </div>
    </>
  );
}

export default Cart;
