import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState
} from "react";
import { productReducer, initialState } from "../reducer/productReducer";
import { useAuth } from "./AuthProvider";
import axios from "axios";
import { apiClient } from "../Api/axios.instance";
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [loading, setLoading] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        setLoading(true);
        const products = apiClient.get("/products");
        const categories = apiClient.get("/category");

        const response = await axios.all([products, categories]);

        dispatch({ type: "GET_PRODUCTS", payload: response[0].data.products });
        dispatch({
          type: "GET_CATEGORIES",
          payload: response[1].data.category
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProductsAndCategories();
  }, [user]);

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
    <ProductContext.Provider
      value={{
        products: state.products,
        categories: state.categories,
        cart: state.cart,
        wishlist: state.wishlist,
        sortBy: state.sortBy,
        showFastDelivery: state.showFastDelivery,
        showOutOfStock: state.showOutOfStock,
        showErrorMessage: state.showErrorMessage,
        dispatch,
        loading
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
