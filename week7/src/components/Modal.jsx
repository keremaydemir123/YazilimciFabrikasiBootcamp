import React, { Component } from "react";
import { connect } from "react-redux";
import CloseIcon from "../icons/CloseIcon";
import DeleteIcon from "../icons/DeleteIcon";
import "../styles/modal.css";
import Basket from "./Basket";
import { removeFromCart } from "../redux/actions/productsActions";
import ProductAmountCounter from "./ProductAmountCounter";

class Modal extends Component {
  handleDelete = (id) => {
    this.props.deleteItem({ id });
  };

  render() {
    const { cart, isOpen, handleClose } = this.props;

    if (isOpen)
      return (
        <div className="modal">
          <div className="modal__content__wrapper">
            <div className="modal__content">
              <div className="modal__header">
                <Basket disabled />
                <CloseIcon onClick={handleClose} className="modal__close" />
              </div>
              <div className="modal__body">
                <div className="modal__items">
                  {cart.map((product) => (
                    <div className="modal__item" key={product.id}>
                      <div className="modal__item__left">
                        <ProductAmountCounter product={product} />
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="modal__item__image"
                        />
                        <div className="modal__item__content">
                          <div className="modal__item__title">
                            {product.title}
                          </div>
                          <div className="modal__item__price">
                            {product.price * product.cart.amount} $
                          </div>
                        </div>
                      </div>
                      <div className="modal__item__right">
                        <DeleteIcon
                          onClick={() => this.handleDelete(product.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="modal__footer">
                  <div>
                    Total:{" "}
                    <span className="modal__total">
                      {Math.round(
                        cart.reduce(
                          (acc, item) => acc + item.price * item.cart.amount,
                          0
                        ) * 100
                      ) / 100}
                      $
                    </span>
                  </div>
                  <button
                    className="button button-reverse"
                    style={{ fontSize: "20px" }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return <></>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // dispatching plain actions
    deleteItem: ({ id }) => dispatch(removeFromCart({ id })),
  };
}

export default connect(null, mapDispatchToProps)(Modal);
