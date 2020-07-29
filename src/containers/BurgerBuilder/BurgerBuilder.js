import React, { useState, useEffect } from "react";
import Burger from "./../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "./../../components/UI/Modal/Modal";
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath,
} from "./../../store/actions/index";

const BurgerBuilder = ({
  onInitIngredients,
  onInitPurchase,
  isAuthenticated,
  onSetAuthRedirectPath,
  history,
  ings,
  onIngredientAdded,
  onIngredientRemoved,
  price,
  error,
}) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // console.log(props);
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ingredientKey) => {
        return ingredients[ingredientKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // console.log("Sum", sum);
    return sum > 0;
  };

  const handlePurchase = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("/checkout");
      history.push("/auth");
    }
  };

  const handlePurchaseCancel = () => {
    setPurchasing(false);
  };

  const handlePurchaseContinue = () => {
    onInitPurchase();
    history.push("/checkout");
  };

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
          purchasable={updatePurchaseState(ings)}
          isAuth={isAuthenticated}
          ordered={handlePurchase}
        />
      </div>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ings}
        purchaseCanceled={handlePurchaseCancel}
        purchaseContinue={handlePurchaseContinue}
        price={price}
      />
    );
  }

  return (
    <div>
      <Modal show={purchasing} modalClosed={handlePurchaseCancel}>
        {orderSummary}
      </Modal>
      {burger}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    ings: state.ingredient.ingredients,
    price: state.ingredient.totalPrice,
    error: state.order.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
