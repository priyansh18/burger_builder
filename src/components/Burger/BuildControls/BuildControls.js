import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Onion", type: "onion" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = ({ onIngredientAdd, onIngredientRemove, disabled, price, purchasable, ordered, isAuth }) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total Price: <span>Rs. {price.toFixed(2)}</span>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          label={ctrl.label}
          key={ctrl.type}
          onIngredientAdd={() => onIngredientAdd(ctrl.type)}
          onIngredientRemove={() => onIngredientRemove(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
      ))}
      <button className={classes.OrderButton} disabled={!purchasable} onClick={ordered}>
        {isAuth ? 'Order Now' : 'Sign Up to Order'}
      </button>
    </div>
  );
};

export default BuildControls;
