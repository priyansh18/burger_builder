import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from './../NavigationItems/NavigationItems';

const ToolBar = () => {
  return (
    <header className={classes.ToolBar}>
      <div>MENU</div>
      <Logo height="80%" />
      <NavigationItems/>
    </header>
  );
};

export default ToolBar;
