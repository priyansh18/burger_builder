import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = ({ ingredients }) => {
  // console.log(ingredients);
  // object.keys converts object received from BurgerBuilder components into array
  let transformedIngredients = Object.keys(ingredients).map((ingredientKey) => {
    return [...Array(ingredients[ingredientKey])].map((_, index) => {
      return <BurgerIngredient key={ingredientKey + index} type={ingredientKey} />;
    });
  }).reduce((arr,el)=>{
    return arr.concat(el)
  },[]);
  // console.log(transformedIngredients);
  if(transformedIngredients.length===0){
    transformedIngredients = <p>Please start adding Ingredients!</p>
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
