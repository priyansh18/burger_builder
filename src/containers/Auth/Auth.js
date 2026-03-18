import React, { Component } from "react";
import Input from "./../../components/UI/Input/Input";
import Button from "./../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { auth } from "./../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "./../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { setAuthRedirectPath } from "./../../store/actions/index";

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
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

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
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const { controls } = this.state;
    const { loading, error, isAuthenticated } = this.props;
    const formElementsArray = [];
    for (let key in controls) {
      formElementsArray.push({
        id: key,
        config: controls[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
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
    if (loading) {
      form = <Spinner />;
    }
    let errorMessage = null;

    if (error) {
      errorMessage = <p>{error.message}</p>;
    }

    let authRedirect = null;
    if (isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={classes.Auth}>
        {authRedirect}
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '1.6rem',
          marginBottom: '6px',
          color: '#1C1917'
        }}>{this.state.isSignup ? "Create Account" : "Welcome Back"}</h2>
        <p style={{
          color: '#78716C',
          fontSize: '0.9rem',
          marginBottom: '28px'
        }}>{this.state.isSignup ? "Sign up to start ordering" : "Sign in to your account"}</p>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">
            {this.state.isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>
        <Button clicked={this.switchAuthModeHandler} btnType="Danger">
          {this.state.isSignup ? "Already have an account? Sign In" : "Need an account? Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.ingredient.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
