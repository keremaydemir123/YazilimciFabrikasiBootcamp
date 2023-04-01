import { productActionTypes } from "../types/product-action-types";

export const setProducts = (products) => {
  return {
    type: productActionTypes.SET_PRODUCTS,
    payload: products,
  };
};

export const addToCart = ({ id, amount }) => {
  return {
    type: productActionTypes.ADD_TO_CART,
    payload: { id, amount },
  };
};

export const removeFromCart = ({ id }) => {
  return {
    type: productActionTypes.REMOVE_FROM_CART,
    payload: { id },
  };
};

export const increaseCartProductAmount = ({ id }) => {
  return {
    type: productActionTypes.INCREASE_CART_PRODUCT_AMOUNT,
    payload: { id },
  };
};

export const decreaseCartProductAmount = ({ id }) => {
  return {
    type: productActionTypes.DECREASE_CART_PRODUCT_AMOUNT,
    payload: { id },
  };
};
