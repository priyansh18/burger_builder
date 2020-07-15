import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import  classes from './BuildControls.module.css';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Onion", type: "onion" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = () => {
  return (
    <div className={classes.BuildControls}>
      {controls.map((ctrl) => (
        <BuildControl label={ctrl.label} key={ctrl.type} />
      ))}
    </div>
  );
};

export default BuildControls;
