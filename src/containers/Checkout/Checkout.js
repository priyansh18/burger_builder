import React, { Component } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    console.log("Query", query);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      }
      ingredients[param[0]] = +param[1];
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price,
    });
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contactdata");
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          exact
          path={this.props.match.path + "/contactdata"}
          render={(props) => (
            <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />
          )}
        />
      </div>
    );
  }
}

export default Checkout;