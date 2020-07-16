import React from "react";
import classes from "./BuildControl.module.css";

const BuildControl = ({ label, onIngredientAdd, onIngredientRemove, disabled }) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less} onClick={onIngredientRemove} disabled={disabled}>
        Less
      </button>
      <button className={classes.More} onClick={onIngredientAdd}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
