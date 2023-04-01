import { categoryActionTypes } from "../types/category-action-types";

export const setCategories = (categories) => {
  return {
    type: categoryActionTypes.SET_CATEGORIES,
    payload: categories,
  };
};

export const toggleCategory = (category) => {
  return {
    type: categoryActionTypes.TOGGLE_CATEGORY,
    payload: category,
  };
};
