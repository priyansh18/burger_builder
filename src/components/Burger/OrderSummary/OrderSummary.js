import React from "react";
import Button from "./../../UI/Button/Button";

const OrderSummary = ({ ingredients, price, purchaseCanceled, purchaseContinue }) => {
  const ingredientSummary = Object.keys(ingredients).map((ingredientKey) => {
    return (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:  {ingredients[ingredientKey]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <p>Tasty burger with following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price : </strong> Rs. {price}
      </p>
      <p>Continue to CheckOut ?</p>
      <Button btnType="Danger" clicked={purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinue}>
        Continue
      </Button>
    </div>
  );
};

export default OrderSummary;
