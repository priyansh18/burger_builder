import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import { addIngredient, removeIngredient } from "./../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    console.log(this.props);
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
    return sum > 0;
  }

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
    this.props.history.push("/checkout");
  };

  render() {
    const { purchasing, error } = this.state;
    const { ings, onIngredientAdded, onIngredientRemoved, price } = this.props;
    const disabledInfo = {
      ...ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ings) {
      burger = (
        <div>
          <Burger ingredients={ings} />
          <BuildControls
            onIngredientAdd={onIngredientAdded}
            onIngredientRemove={onIngredientRemoved}
            disabled={disabledInfo}
            price={price}
            purchasable={this.updatePurchaseState(ings)}
            ordered={this.handlePurchase}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          purchaseCanceled={this.handlePurchaseCancel}
          purchaseContinue={this.handlePurchaseContinue}
          price={price}
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
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
