import React from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = ({history,ings, purchased,match})=> {
  const checkoutCancelled = () => {
    history.goBack();
  };

  const checkoutContinued = () => {
    history.replace("/checkout/contactdata");  
  };
  
    let summary = <Redirect to="/" />;
    if (ings) {
      const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ings}
            checkoutCancelled={checkoutCancelled}
            checkoutContinued={checkoutContinued}
          />
          <Route exact path={match.path + "/contactdata"} component={ContactData} />
        </div>
      );
    }
    return summary;
  
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredient.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
