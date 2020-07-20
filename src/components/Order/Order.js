import React from "react";
import classes from "./Order.module.css";

const Order = ({ ingredients, price }) => {
  // console.log("Ingredients", ingredients);
  // console.log("Price", price);
  const all_ingredients = [];
  for (let ingredient in ingredients) {
    all_ingredients.push({ name: ingredient, amount: ingredients[ingredient] });
  }

  const ingredientOutput = all_ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "o 13px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients: </strong>
        {ingredientOutput}
      </p>
      <p>
        <strong>Price:</strong>Rs. {price}
      </p>
    </div>
  );
};

export default Order;
