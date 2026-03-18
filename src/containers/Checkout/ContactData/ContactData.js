import React, { useState } from "react";
import classes from "./ContactData.module.css";
import Input from "./../../../components/UI/Input/Input";

const ContactData = ({ onContactSubmit, onBack }) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Your Name" },
      value: "", validation: { required: true }, valid: false, touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Street Address" },
      value: "", validation: { required: true }, valid: false, touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "ZIP Code" },
      value: "", validation: { required: true, minLength: 5, maxLength: 6 }, valid: false, touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Country" },
      value: "", validation: { required: true }, valid: false, touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: { type: "email", placeholder: "Email Address" },
      value: "", validation: { required: true }, valid: false, touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Express (30 min)" },
          { value: "standard", displayValue: "Standard (45 min)" },
          { value: "cheapest", displayValue: "Economy (60 min)" },
        ],
      },
      value: "fastest", validation: {}, valid: true, touched: true,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const checkValidation = (value, rules) => {
    let isValid = true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid) return;
    const formData = {};
    for (let key in orderForm) {
      formData[key] = orderForm[key].value;
    }
    onContactSubmit(formData);
  };

  const handleInputChange = (event, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidation(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let isValid = true;
    for (let key in updatedOrderForm) {
      isValid = updatedOrderForm[key].valid && isValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(isValid);
  };

  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }

  return (
    <div className={classes.ContactData}>
      <h4>Delivery Details</h4>
      <p className={classes.Subtitle}>Where should we deliver your burger?</p>
      <form onSubmit={handleSubmit}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => handleInputChange(event, formElement.id)}
          />
        ))}
        <div className={classes.Actions}>
          <button type="button" className={classes.BackBtn} onClick={onBack}>Back</button>
          <button type="submit" className={classes.ContinueBtn} disabled={!formIsValid}>Continue to Payment</button>
        </div>
      </form>
    </div>
  );
};

export default ContactData;
