import React from "react";
import classes from "./Layout.module.css";
import ToolBar from "./../Navigation/ToolBar/ToolBar";

const Layout = (props) => {
  return (
    <div>
      <ToolBar />
      <main className={classes.Content}>{props.children}</main>
    </div>
  );
};

export default Layout;
