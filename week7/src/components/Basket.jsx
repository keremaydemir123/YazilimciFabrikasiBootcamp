import React, { Component } from "react";
import { connect } from "react-redux";
import CartIcon from "../icons/CartIcon";
import Modal from "./Modal";

class Basket extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  handleShow = () => {
    if (!this.props.disabled) this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { products } = this.props;
    const cart = products.filter((product) => product.cart.inCart);
    return (
      <div className="cart">
        <Modal
          isOpen={this.state.isOpen}
          handleClose={this.handleClose}
          cart={cart}
        />
        <CartIcon onClick={this.handleShow} />
        <div className="cart__count">{cart.length}</div>
      </div>
    );
  }
}

function mapStateToProps(state /*, reducers obj */) {
  // create a named props obj
  return {
    // propsName: state.reducerName
    products: state.products,
  };
}

export default connect(mapStateToProps, null)(Basket);
