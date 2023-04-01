import React, { Component } from "react";
import { connect } from "react-redux";
import ProductCard from "./ProductCard";

class ProductList extends Component {
  render() {
    const { products, categories } = this.props;
    const selectedCategories = categories
      .filter((category) => category.isSelected)
      .map((category) => category.name);

    const filteredProducts = products.filter((product) => {
      return selectedCategories.includes(product.category.name);
    });

    if (filteredProducts.length > 0) {
      return (
        <div className="card-container">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      );
    }

    return <div className="card-container">There is nothing here</div>;
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories,
  };
}

export default connect(mapStateToProps, null)(ProductList);
