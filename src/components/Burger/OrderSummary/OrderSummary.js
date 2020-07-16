import React from "react";

const OrderSummary = ({ ingredients }) => {
  const ingredientSummary = Object.keys(ingredients).map((ingredientKey) => {
    return (
      <li key={ingredientKey}>
        <span style={{ textTransform: "capitalize" }}>{ingredientKey}</span>:{ingredients[ingredientKey]}
      </li>
    );
  });
  return (
    <div>
      <h3>Your Order</h3>
      <p>Tasty burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to CheckOut?</p>
    </div>
  );
};

export default OrderSummary;
