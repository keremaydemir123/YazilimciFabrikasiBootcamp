import { categoryActionTypes } from "../types/category-action-types";

export const categoryReducer = (state = [], { type, payload }) => {
  switch (type) {
    case categoryActionTypes.SET_CATEGORIES:
      return payload;
    case categoryActionTypes.TOGGLE_CATEGORY:
      return state.map((category) => {
        if (category.name === payload.name) {
          return { ...category, isSelected: !category.isSelected };
        }
        return category;
      });
    default:
      return state;
  }
};
