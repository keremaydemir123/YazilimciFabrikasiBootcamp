import { productActionTypes } from "../types/product-action-types";

export const productsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case productActionTypes.SET_PRODUCTS:
      return payload;

    case productActionTypes.ADD_TO_CART:
      return state.map((product) => {
        if (product.id === payload.id) {
          return {
            ...product,
            cart: {
              inCart: true,
              amount: payload.amount,
            },
          };
        }
        return product;
      });

    case productActionTypes.REMOVE_FROM_CART:
      return state.map((product) => {
        if (product.id === payload.id) {
          return { ...product, cart: { inCart: false, amount: 0 } };
        }
        return product;
      });

    case productActionTypes.INCREASE_CART_PRODUCT_AMOUNT:
      return state.map((product) => {
        if (product.id === payload.id) {
          return {
            ...product,
            cart: {
              ...product.cart,
              amount: product.cart.amount + 1,
            },
          };
        }
        return product;
      });

    case productActionTypes.DECREASE_CART_PRODUCT_AMOUNT:
      return state.map((product) => {
        if (product.id === payload.id) {
          return {
            ...product,
            cart: {
              ...product.cart,
              amount: product.cart.amount - 1,
            },
          };
        }
        return product;
      });
    default:
      return state;
  }
};
