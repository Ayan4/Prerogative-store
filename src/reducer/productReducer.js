export const productReducer = (state, action) => {
  switch (action.type) {
    case "SORT":
      return {
        ...state,
        sortBy: action.payload
      };

    case "FAST_DELIVERY":
      return {
        ...state,
        showFastDelivery: !state.showFastDelivery
      };

    case "OUT_OF_STOCK":
      return {
        ...state,
        showOutOfStock: !state.showOutOfStock
      };

    case "REMOVE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload._id)
      };

    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload._id)
      };

    case "INCREASE":
      return {
        ...state,
        cart: state.cart.map(item => {
          return item._id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      };

    case "DECREASE":
      return {
        ...state,
        cart: state.cart.map(item => {
          return item._id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        })
      };

    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload
      };

    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload
      };

    case "SET_CART":
      return {
        ...state,
        cart: action.payload
      };

    case "SET_WISHLIST":
      return {
        ...state,
        wishlist: action.payload
      };

    default:
      return state;
  }
};
