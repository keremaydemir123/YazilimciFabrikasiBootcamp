import React, { Component } from "react";
import { connect } from "react-redux";

class Categories extends Component {
  handleToggleCategory = (e, category) => {
    this.props.toggleCategory(category);
    e.target.classList.toggle("selected");
  };

  render() {
    return (
      <div className="category">
        <div className="category__header">
          <h1 className="category__header__title">CATAGORIES</h1>
        </div>
        {this.props.categories.map((category, index) => {
          return (
            <div className="category__body" key={index}>
              <div className="category__body__name">
                {category.name} ({category.itemCount})
              </div>
              <input
                type="checkbox"
                checked={category.isSelected}
                className="category__body__checkbox"
                onChange={(e) => this.handleToggleCategory(e, category)}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggleCategory: (category) =>
      dispatch({ type: "TOGGLE_CATEGORY", payload: category }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
