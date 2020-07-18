import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";

const INGREDIENT_PRICE = {
  salad: 30,
  cheese: 40,
  onion: 20,
  tomato: 10,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 80,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get("https://burger-builder-5a5c5.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: true,
        });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // console.log("Sum", sum);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    // Update Ingredients
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // Updating Price
    const priceAddition = INGREDIENT_PRICE[type];
    const newPrice = this.state.totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
    //Passed UpdatedINgredients to render checkout button of updated state not the default state
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;

    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;

    // Updating Price
    const priceDeduction = INGREDIENT_PRICE[type];
    const newPrice = this.state.totalPrice - priceDeduction;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  handlePurchase = () => {
    this.setState({
      purchasing: true,
    });
  };

  handlePurchaseCancel = () => {
    this.setState({
      purchasing: false,
    });
  };

  handlePurchaseContinue = () => {
    // alert("Continue!!!!");
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Priyansh Singhal",
        address: {
          street: "Test1234",
          zipcode: "12345",
          country: "India",
        },
        email: "priyansh@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  };

  render() {
    const { ingredients, totalPrice, purchasable, purchasing, error } = this.state;
    const disabledInfo = {
      ...ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <div>
          <Burger ingredients={ingredients} />
          <BuildControls
            onIngredientAdd={this.addIngredientHandler}
            onIngredientRemove={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={totalPrice}
            purchasable={purchasable}
            ordered={this.handlePurchase}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={this.handlePurchaseCancel}
          purchaseContinue={this.handlePurchaseContinue}
          price={totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <div>
        <Modal show={purchasing} modalClosed={this.handlePurchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </div>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
