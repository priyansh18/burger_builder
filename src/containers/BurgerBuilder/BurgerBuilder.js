import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      onion: 1,
      cheese: 2,
      tomato: 2,
    },
  };
  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <Burger ingredients={ingredients} />
      </div>
    );
  }
}

export default BurgerBuilder;
