import React, { Component } from "react";
import Input from "./../../components/UI/Input/Input";
import Button from "./../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import {auth } from "./../../store/actions/index";
import { connect } from "react-redux";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup:true,
  };

  checkValidation(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    // console.log(event.target.value);
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();
    // console.log("Email",this.state.controls.email.value);
    // console.log("Password",this.state.controls.password.value);
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value,this.state.isSignup);
  };

  switchAuthModeHandler = ()=>{
    this.setState(prevState=>{
      return {isSignup:!prevState.isSignup}
    })
  }

  render() {
    const { controls } = this.state;
    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }
    // console.log("FormElementsArray", formElementsArray);
    const form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          <Button clicked={this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password,isSignup) => dispatch(auth(email, password,isSignup)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
