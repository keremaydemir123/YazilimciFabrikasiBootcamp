import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/productsActions";
import CartIcon from "../icons/CartIcon";
import { Link } from "react-router-dom";

class ProductCard extends Component {
  handleAdd = (e) => {
    e.stopPropagation();
    this.props.addToCart({ id: this.props.product.id, amount: 1 });
  };

  handleRemove = (e) => {
    e.stopPropagation();
    this.props.removeFromCart({ id: this.props.product.id });
  };

  handleSelect = () => {
    this.props.selectProduct({ product: this.props.product });
  };

  render() {
    const { product } = this.props;
    return (
      <div className="card">
        <img
          src={product.images[0]}
          alt={product.title}
          className="image"
          height={180}
        />
        <div className="card__title"> {product.title} </div>
        <h2 className="price"> {product.price} $</h2>
        <div className="card__footer">
          {!product.cart.inCart ? (
            <button className="button" onClick={this.handleAdd}>
              <CartIcon className="small-icon" /> Add to Cart
            </button>
          ) : (
            <button
              className="button button-reverse"
              onClick={this.handleRemove}
            >
              Remove from Cart
            </button>
          )}
          <Link
            to={`/products/${product.id}`}
            className="button button-details"
          >
            See Details
          </Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    addToCart: ({ id, amount }) => dispatch(addToCart({ id, amount })),
    removeFromCart: ({ id }) => dispatch(removeFromCart({ id })),
  };
}

export default connect(null, mapDispatchToProps)(ProductCard);
