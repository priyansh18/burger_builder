import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 2,
      onion: 1,
      cheese: 2,
      tomato: 3,
    },
  };
  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <Burger ingredients={ingredients} />
        <BuildControls />
      </div>
    );
  }
}

export default BurgerBuilder;
