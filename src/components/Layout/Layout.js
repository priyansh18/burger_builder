import React, { Component } from "react";
import classes from "./Layout.module.css";
import ToolBar from "./../Navigation/ToolBar/ToolBar";
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };
  handleSideDrawerClosed = () => {
    this.setState({
      showSideDrawer: false,
    });
  };

  handleDrawerToggle = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <ToolBar handleToggle={this.handleDrawerToggle} />
        <SideDrawer show={this.state.showSideDrawer} closed={this.handleSideDrawerClosed} />
        <main className={classes.Content}>{children}</main>
      </div>
    );
  }
}

export default Layout;
