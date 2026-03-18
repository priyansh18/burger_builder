import React from "react";
import classes from "./Order.module.css";

const Order = ({ ingredients, price }) => {
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
          margin: "4px 6px",
          background: "#FFF8F0",
          border: "1px solid #E7E5E4",
          borderRadius: "6px",
          padding: "6px 14px",
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "#4A2C1F",
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
      <p style={{ marginTop: '12px' }}>
        <strong>Price: </strong>
        <span style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          color: '#C77810',
          fontSize: '1.1rem'
        }}>Rs. {Number(price).toFixed(2)}</span>
      </p>
    </div>
  );
};

export default Order;
