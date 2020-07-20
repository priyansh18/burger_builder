import React, { Component } from "react";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import Input from "./../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      orderData: formData,
      price: this.props.price,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({
          loading: false,
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({
          loading: false,
        });
      });
  };

  handleInputChange = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm,
    });
  };

  render() {
    const { orderForm } = this.state;
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key],
      });
    }
    // console.log(this.props.price);
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.handleInputChange(event, formElement.id)}
          />
        ))}
        <Button clicked={this.orderHandler} btnType="Success">ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.Input}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
