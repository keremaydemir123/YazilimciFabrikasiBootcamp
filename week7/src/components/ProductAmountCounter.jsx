import React, { Component } from "react";
import { connect } from "react-redux";
import DownIcon from "../icons/DownIcon";
import UpIcon from "../icons/UpIcon";
import {
  decreaseCartProductAmount,
  increaseCartProductAmount,
} from "../redux/actions/productsActions";

class ProductAmountCounter extends Component {
  handleDecrease = () => {
    if (this.props.product.cart.amount === 1) return; // Prevent negative values
    this.props.decreaseProductAmount({ id: this.props.product.id });
  };

  handleIncrease = () => {
    this.props.increaseProductAmount({ id: this.props.product.id });
  };

  render() {
    const { product } = this.props;
    return (
      <div className="counter">
        <UpIcon onClick={this.handleIncrease} />
        <input
          type="text"
          className="counter__input"
          disabled
          value={product.cart.amount}
        />
        <DownIcon onClick={this.handleDecrease} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    increaseProductAmount: ({ id }) =>
      dispatch(increaseCartProductAmount({ id })),
    decreaseProductAmount: ({ id }) =>
      dispatch(decreaseCartProductAmount({ id })),
  };
}

export default connect(null, mapDispatchToProps)(ProductAmountCounter);
