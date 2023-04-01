import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CartIcon from "../icons/CartIcon";
import { addToCart, removeFromCart } from "../redux/actions/productsActions";

class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("https://api.escuelajs.co/api/v1/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        this.setState({ product: data });
      })
      .catch((err) => console.log(err));
  }

  handleAdd = () => {
    this.props.addToCart({ id: this.state.product.id, amount: 1 });
  };

  handleRemove = () => {
    this.props.removeFromCart({ id: this.state.product.id });
  };

  render() {
    const { product } = this.state;
    const { products } = this.props;

    if (!product) {
      return null;
    }

    return (
      <div className="product-details">
        <div className="product-details__gallery">
          <div className="product-gallery__images">
            {product?.images?.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt={product?.name}
                  width={80}
                  height={80}
                />
              );
            })}
          </div>
          <div className="product-gallery__big-image">
            <img src={product?.images[0]} alt={product?.name} />
          </div>
        </div>
        <div className="product-details__content">
          <div className="product-details__content__upper">
            <h2>{product?.title}</h2>
            <h3
              style={{
                marginBottom: "20px",
                color: "var(--light-navy)",
                fontSize: "0.9rem",
              }}
            >
              {product.category.name}
            </h3>
            <p>{product?.description}</p>
          </div>
          <div className="product-details__content__lower">
            <h1
              className="price"
              style={{ fontSize: "30px", fontWeight: "bold" }}
            >
              {product?.price} $
            </h1>
            {!products.find((state) => state.id === product.id)?.cart
              ?.inCart ? (
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: ({ id, amount }) => dispatch(addToCart({ id, amount })),
    removeFromCart: ({ id }) => dispatch(removeFromCart({ id })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductDetails));
