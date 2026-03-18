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
  let burger = error ? (
    <p style={{
      textAlign: 'center',
      padding: '60px 20px',
      color: '#DC2626',
      fontSize: '0.95rem'
    }}>Unable to load ingredients. Please try again.</p>
  ) : <Spinner />;

  if (ings) {
    burger = (
      <div>
        <div style={{
          background: 'linear-gradient(165deg, #0D0705 0%, #1A0F0A 30%, #2A1810 60%, #1A0F0A 100%)',
          padding: '48px 20px 32px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '2.4rem',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '8px',
            position: 'relative',
            letterSpacing: '-0.02em',
          }}>Build Your Burger</h1>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '0.9rem',
            position: 'relative',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>Craft your masterpiece with premium ingredients</p>
        </div>
        <div style={{
          background: 'linear-gradient(180deg, #0D0705 0%, var(--color-bg) 20%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '8px',
        }}>
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
