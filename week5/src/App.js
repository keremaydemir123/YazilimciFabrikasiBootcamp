import React from "react";
import "./App.css";

import GlobalCard from "./components/GlobalCard";
import SpecificCard from "./components/SpecificCard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      unit: "C",
    };
  }
  handleValueDecrease = () => {
    this.setState((prevState) => ({
      value: prevState.value - 1,
    }));
  };

  handleValueIncrease = () => {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  };

  handleUnitChange = (e) => {
    this.setState({
      unit: e.target.value,
    });
  };

  handleValueSet = (val) => {
    this.setState({
      value: Number(val),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="global">
          <GlobalCard
            globalValue={this.state.value}
            globalUnit={this.state.unit}
            handleValueDecrease={this.handleValueDecrease}
            handleValueIncrease={this.handleValueIncrease}
            handleUnitChange={this.handleUnitChange}
            handleValueSet={this.handleValueSet}
          />
        </div>
        <div className="specific">
          <SpecificCard
            globalValue={this.state.value}
            globalUnit={this.state.unit}
            localUnit={"C"}
          />
          <SpecificCard
            globalValue={this.state.value}
            globalUnit={this.state.unit}
            localUnit={"F"}
          />
          <SpecificCard
            globalValue={this.state.value}
            globalUnit={this.state.unit}
            localUnit={"K"}
          />
        </div>
      </div>
    );
  }
}

export default App;
