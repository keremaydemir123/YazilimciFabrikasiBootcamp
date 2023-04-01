export const loadState = (state) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = ({ products, categories }) => {
  try {
    const serializedState = JSON.stringify(products);
    localStorage.setItem("products", serializedState);
  } catch {
    // ignore write errors
  }

  try {
    const serializedState = JSON.stringify(categories);
    localStorage.setItem("categories", serializedState);
  } catch {
    // ignore write errors
  }
};
