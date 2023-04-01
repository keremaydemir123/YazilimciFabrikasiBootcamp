import React from "react";

class GlobalCard extends React.Component {
  render() {
    const {
      globalValue,
      globalUnit,
      handleValueDecrease,
      handleValueIncrease,
      handleUnitChange,
      handleValueSet,
    } = this.props;

    return (
      <div className="card">
        <select className="unit-box" onChange={handleUnitChange}>
          <option value="C">&deg;C</option>
          <option value="F">&deg;F</option>
          <option value="K">&deg;K</option>
        </select>

        <div className="flex-center">
          <input
            type="number"
            value={globalValue}
            onChange={(e) => handleValueSet(e.target.value)}
          />
        </div>

        <div className="btn-container">
          <button className="btn" onClick={handleValueIncrease}>
            Increase
          </button>
          <button className="btn" onClick={handleValueDecrease}>
            Decrease
          </button>
          <div
            className="degree-unit"
            style={{ width: "50px", height: "50px", fontSize: "25px" }}
          >
            &deg; {globalUnit}
          </div>
        </div>
      </div>
    );
  }
}
export default GlobalCard;
