import "./style.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/ErrorPage/Error";
import ScreenLoader from "./pages/ScreenLoader/ScreenLoader";
import { useAuth } from "./context/AuthProvider";
import { useProduct } from "./context/product-context";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

function App() {
  const { user } = useAuth();
  const { dispatch } = useProduct();
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://Prerogative-store.ayanshukla.repl.co/products"
      );
      console.log(response);
      dispatch({ type: "GET_PRODUCTS", payload: response.data });
      setLoading(false);
    };
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get(
        "https://Prerogative-store.ayanshukla.repl.co/cart"
      );
      dispatch({ type: "GETCART", payload: response.data.cart });
    };
    fetchCartItems();
  }, [dispatch]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const response = await axios.get(
        "https://Prerogative-store.ayanshukla.repl.co/wishlist"
      );
      dispatch({ type: "GETWISHLIST", payload: response.data.wishlist });
    };
    fetchWishlistItems();
  }, [dispatch]);

  return (
    <div className="App-container">
      {loading ? (
        <ScreenLoader circleSpinner />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route
            path="/product-detail/:productID"
            element={<ProductDetails />}
          />
          <PrivateRoute path="/wishlist" login={user} element={<Wishlist />} />
          <PrivateRoute path="/cart" login={user} element={<Cart />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
