import React, { useEffect } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { authCheckState } from "./store/actions/index";

const App = ({isAuthenticated,onTryAutoSignup}) => {
  useEffect(() => {
    onTryAutoSignup();
  },[onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/orders" component={Orders} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />

        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div className="App">
      <Layout>{routes} </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
