// import data from "../data";

export const productReducer = (state, action) => {
  switch (action.type) {
    case "sort":
      return {
        ...state,
        sortBy: action.payload
      };

    case "FAST-DELIVERY":
      return {
        ...state,
        showFastDelivery: !state.showFastDelivery
      };

    case "OUT-OF-STOCK":
      return {
        ...state,
        showOutOfStock: !state.showOutOfStock
      };

    case "ADDTOCART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        wishlist: state.wishlist.filter(item => item._id !== action.payload._id)
      };

    case "WISHLIST":
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
        cart: state.cart.filter(item => item._id !== action.payload._id)
      };

    case "REMOVEWISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload._id)
      };

    case "MOVETOCART":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          item => item._id !== action.payload._id
        ),
        cart: [...state.cart, action.payload]
      };

    case "REMOVECART":
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload._id)
      };

    case "MOVETOWISHLIST":
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload._id),
        wishlist: [...state.wishlist, action.payload]
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

    case "GETCART":
      return {
        ...state,
        cart: action.payload
      };

    case "GETWISHLIST":
      return {
        ...state,
        wishlist: action.payload
      };

    default:
      return state;
  }
};
