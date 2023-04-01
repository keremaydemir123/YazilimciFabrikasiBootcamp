import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "../components/Categories";
import ProductList from "../components/ProductList";
import { setProducts } from "../redux/actions/productsActions";
import { setCategories } from "../redux/actions/categoryActions";
import { loadState } from "../localStorage";

const fetchProducts = async () => {
  return await fetch("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

const fetchCategories = async () => {
  return await fetch("https://api.escuelajs.co/api/v1/categories")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};

class Home extends Component {
  async componentDidMount() {
    const persistedProductState = loadState("products");
    const persistenCategoryState = loadState("categories");
    if (persistenCategoryState.length > 0 && persistedProductState.length > 0) {
      this.initialSetup(persistedProductState, persistenCategoryState);
      return;
    }

    const products = await fetchProducts();
    const mProducts = products?.map((product) => {
      return {
        ...product,
        cart: {
          inCart: false,
          amount: 0,
        },
        category: { name: product.category.name, isSelected: true },
      };
    });
    const categories = await fetchCategories();
    const mCategories = categories?.map((category) => {
      return {
        ...category,
        isSelected: true,
      };
    });

    this.initialSetup(mProducts, mCategories);
  }

  initialSetup(products, categories) {
    this.props.setProducts(products);
    // find how many projects in each category and return count
    const count = (category) => {
      return products.filter((product) => product.category.name === category)
        .length;
    };
    // add count to each category
    const mCategories = categories.map((category) => {
      return {
        ...category,
        itemCount: count(category.name),
      };
    });
    this.props.setCategories(mCategories);
  }

  render() {
    return (
      <div className="home">
        <Categories />
        <ProductList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    setProducts: (val) => dispatch(setProducts(val)),
    setCategories: (val) => dispatch(setCategories(val)),
  };
}

export default connect(null, mapDispatchToProps)(Home);
