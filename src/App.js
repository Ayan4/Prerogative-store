import "./style.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiClient } from "./Api/axios.instance";
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
import { useProduct } from "./context/productProvider";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

function App() {
  const { user } = useAuth();
  const { dispatch } = useProduct();
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      const products = apiClient.get("/products");
      const categories = apiClient.get("/category");

      const response = await axios.all([products, categories]);

      dispatch({ type: "GET_PRODUCTS", payload: response[0].data.products });
      dispatch({ type: "GET_CATEGORIES", payload: response[1].data.category });
      setLoading(false);
    };
    fetchProductsAndCategories();
  }, [user, dispatch]);

  useEffect(() => {
    const fetchCartAndWishlist = async () => {
      const fetchCart = apiClient.get("/cart");
      const fetchWishlist = apiClient.get("/wishlist");

      const response = await axios.all([fetchCart, fetchWishlist]);

      dispatch({ type: "SET_CART", payload: response[0].data.cart.cartItems });
      dispatch({
        type: "SET_WISHLIST",
        payload: response[1].data.wishlist.wishlistItems
      });
    };
    user && fetchCartAndWishlist();
  }, [dispatch, user]);

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
