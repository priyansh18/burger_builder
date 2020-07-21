import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, clicked, btnType, disabled }) => {
  // console.log("btn", btnType);
  return (
    <button className={[classes.Button, classes[btnType]].join(" ")} disabled={disabled} onClick={clicked}>
      {children}
    </button>
  );
};

export default Button;
