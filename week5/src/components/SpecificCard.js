import React from "react";

class SpecificCard extends React.Component {
  render() {
    const { globalValue, globalUnit, localUnit } = this.props;

    let localValue = 0;
    if (globalUnit === localUnit) {
      localValue = globalValue;
    }
    if (globalUnit === "C" && localUnit === "F") {
      localValue = globalValue * 1.8 + 32;
    }
    if (globalUnit === "C" && localUnit === "K") {
      localValue = globalValue + 273.15;
    }
    if (globalUnit === "F" && localUnit === "C") {
      localValue = (globalValue - 32) / 1.8;
    }
    if (globalUnit === "F" && localUnit === "K") {
      localValue = ((globalValue - 32) * 5) / 9 + 273.15;
    }
    if (globalUnit === "K" && localUnit === "C") {
      localValue = globalValue - 273.15;
    }
    if (globalUnit === "K" && localUnit === "F") {
      localValue = ((globalValue - 273.15) * 9) / 5 + 32;
    }

    localValue = localValue.toFixed(2);

    return (
      <div className="card">
        {localValue}
        <div className="degree-unit"> &deg; {localUnit}</div>
      </div>
    );
  }
}

export default SpecificCard;
