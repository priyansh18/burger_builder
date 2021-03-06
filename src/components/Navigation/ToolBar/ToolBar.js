import React from "react";
import classes from "./ToolBar.module.css";
import Logo from "./../../Logo/Logo";
import NavigationItems from "./../NavigationItems/NavigationItems";
import DrawerToggle from "./../SideDrawer/DrawerToggle/DrawerToggle";

const ToolBar = ({ handleToggle,isAuth }) => {
  return (
    <header className={classes.ToolBar}>
      <DrawerToggle clicked={handleToggle} />
      <Logo height="80%" />
      <NavigationItems isAuthenticated={isAuth} />
    </header>
  );
};

export default ToolBar;
