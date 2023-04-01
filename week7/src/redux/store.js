import { createStore } from "redux";
import { saveState } from "../localStorage";

import reducers from "./reducers/index";

const store = createStore(reducers);

store.subscribe(() => {
  saveState({
    products: store.getState().products,
    categories: store.getState().categories,
  });
});

export default store;
