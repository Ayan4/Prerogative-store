import Navbar from "../../Components/Navbar/Navbar";
import WishlistCard from "../../Components/WishlistCard/WishlistCard";
import "./Wishlist.scss";

function Wishlist() {
  return (
    <>
      <Navbar />
      <div className="wishlist-item-list">
        <WishlistCard />
      </div>
    </>
  );
}

export default Wishlist;
