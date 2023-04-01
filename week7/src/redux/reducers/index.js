import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { categoryReducer } from "./categoryReducer";

const reducers = combineReducers({
  categories: categoryReducer,
  products: productsReducer,
});

export default reducers;
