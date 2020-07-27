import React, { Component } from "react";
import classes from "./Layout.module.css";
import ToolBar from "../../components/Navigation/ToolBar/ToolBar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    showSideDrawer: false,
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
    const { children,isAuthenticated } = this.props;
    return (
      <div>
        <ToolBar isAuth={isAuthenticated} handleToggle={this.handleDrawerToggle} />
        <SideDrawer isAuth={isAuthenticated}  show={this.state.showSideDrawer} closed={this.handleSideDrawerClosed} />
        <main className={classes.Content}>{children}</main>
      </div>
    );
  }
}

const mapStateToProps = state=>{
  return{
    isAuthenticated:state.auth.token!==null,
  }
}

export default connect(mapStateToProps)(Layout);
