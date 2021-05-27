import { createContext, useContext, useReducer } from "react";
import { productReducer } from "../reducer/productReducer";
const ProductContext = createContext();

const initialState = {
  products: [],
  categories: [],
  cart: [],
  wishlist: [],
  sortBy: null,
  showFastDelivery: false,
  showOutOfStock: false
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

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
        dispatch
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
