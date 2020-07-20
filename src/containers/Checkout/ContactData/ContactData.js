import React, { Component } from "react";
import Button from "./../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "./../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      zipcode: "",
      country: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Priyansh Singhal",
        address: {
          street: "Test1234",
          zipcode: "12345",
          country: "India",
        },
        email: "priyansh@gmail.com",
      },
      deliveryMethod: "fastest",
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
  render() {
    let form = (
      <form>
        <input classname={classes.Input} type="text" name="name" placeholder="Your Name " />
        <input classname={classes.Input} type="email" name="email" placeholder="Your Email " />
        <input classname={classes.Input} type="text" name="street" placeholder="Street " />
        <input classname={classes.Input} type="text" name="postal" placeholder="Postal Code " />
        <input classname={classes.Input} type="text" name="country" placeholder="Country " />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
