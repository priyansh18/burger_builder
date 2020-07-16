import React from "react";
import classes from "./Button.module.css";

const Button = ({ children, clicked, btnType }) => {
  // console.log("btn", btnType);
  return (
    <div className={[classes.Button, classes[btnType]].join(" ")} onClick={clicked}>
      {children}
    </div>
  );
};

export default Button;
