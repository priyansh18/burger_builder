import React, { useState } from "react";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = ({isAuthenticated,children}) => {
  const [showSideDrawer,setShowSideDrawer]=useState(false)
  const handleSideDrawerClosed = () => {
    setShowSideDrawer(false)
  };

  const handleDrawerToggle = () => {
    setShowSideDrawer(!showSideDrawer)
  };

  return (
    <div>
      <ToolBar isAuth={isAuthenticated} handleToggle={handleDrawerToggle} />
      <SideDrawer isAuth={isAuthenticated} show={showSideDrawer} closed={handleSideDrawerClosed} />
      <main className={classes.Content}>{children}</main>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
