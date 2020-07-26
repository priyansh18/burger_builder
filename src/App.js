import React from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import { Route, Switch } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/orders" component={Orders} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
