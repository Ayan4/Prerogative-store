import "./style.scss";
import { Routes, Route } from "react-router-dom";
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
import Payment from "./Components/Payment/Payment";

function App() {
  const { user } = useAuth();
  const { loading } = useProduct();

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
          <PrivateRoute path="/checkout" login={user} element={<Payment />} />
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
