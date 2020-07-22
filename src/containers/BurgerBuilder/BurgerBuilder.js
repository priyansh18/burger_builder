import React, { Component } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "./../../store/action";

class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    // axios
    //   .get("https://burger-builder-5a5c5.firebaseio.com/ingredients.json")
    //   .then((response) => {
    //     this.setState({
    //       ingredients: response.data,
    //     });
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true,
    //     });
    //   });
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
    const queryParams = [];
    for (let i in this.props.ings) {
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ings[i]));
    }
    queryParams.push("price=" + this.props.price);
    const queryString = queryParams.join("&");
    // console.log(queryParams);

    // console.log(queryString);
    this.props.history.push({
      pathname: "/checkout", 
      search: "?" + queryString,
    });
  };

  render() {
    const { purchasable, purchasing, error } = this.state;
    const { ings, onIngredientAdded, onIngredientRemoved,price } = this.props;
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
            purchasable={purchasable}
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
    onIngredientAdded: (ingName) => dispatch({ type: ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) => dispatch({ type: REMOVE_INGREDIENT, ingredientName: ingName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
