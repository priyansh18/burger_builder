import React, { useState } from "react";
import CheckoutSummary from "./../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import PaymentGateway from "./../../components/Payment/PaymentGateway";
import OrderSuccess from "./../../components/OrderSuccess/OrderSuccess";
import StepIndicator from "./../../components/UI/StepIndicator/StepIndicator";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { purchaseBurger } from "./../../store/actions/index";

const Checkout = ({ history, ings, purchased, price, token, userId, onOrderBurger }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactFormData, setContactFormData] = useState(null);

  if (!ings) {
    return <Redirect to="/" />;
  }

  const checkoutCancelled = () => {
    history.goBack();
  };

  const checkoutContinued = () => {
    setCurrentStep(2);
  };

  const handleContactSubmit = (formData) => {
    setContactFormData(formData);
    setCurrentStep(3);
  };

  const handlePaymentSuccess = () => {
    const order = {
      ingredients: ings,
      orderData: contactFormData,
      price: price,
      userId: userId,
    };
    onOrderBurger(order, token);
    setCurrentStep(4);
  };

  const handlePaymentCancel = () => {
    setCurrentStep(2);
  };

  const handleGoHome = () => {
    history.push("/");
  };

  const handleViewOrders = () => {
    history.push("/orders");
  };

  let stepContent;
  switch (currentStep) {
    case 1:
      stepContent = <CheckoutSummary ingredients={ings} checkoutCancelled={checkoutCancelled} checkoutContinued={checkoutContinued} />;
      break;
    case 2:
      stepContent = <ContactData onContactSubmit={handleContactSubmit} onBack={() => setCurrentStep(1)} />;
      break;
    case 3:
      stepContent = <PaymentGateway price={price} onPaymentSuccess={handlePaymentSuccess} onPaymentCancel={handlePaymentCancel} />;
      break;
    case 4:
      stepContent = <OrderSuccess price={price} onGoHome={handleGoHome} onViewOrders={handleViewOrders} />;
      break;
    default:
      stepContent = null;
  }

  return (
    <div>
      <StepIndicator currentStep={currentStep} />
      <div style={{ animation: 'fadeSlideIn 0.3s ease' }}>{stepContent}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredient.ingredients,
    purchased: state.order.purchased,
    price: state.ingredient.totalPrice,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
