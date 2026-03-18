import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = ({ ingredients }) => {
  let transformedIngredients = Object.keys(ingredients).map((ingredientKey) => {
    return [...Array(ingredients[ingredientKey])].map((_, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />;
    });
  }).reduce((arr, el) => {
    return arr.concat(el);
  }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = (
      <p style={{
        color: '#A8A29E',
        fontStyle: 'italic',
        fontSize: '0.95rem',
        padding: '20px 0'
      }}>
        Start adding ingredients to build your burger
      </p>
    );
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
