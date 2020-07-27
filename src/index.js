import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import ingredientReducer from "./store/reducers/ingredient";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// console.log('Order',orderReducer)
const rootReducer = combineReducers({
  ingredient: ingredientReducer,
  order: orderReducer,
  auth:authReducer,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
// console.log(store)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
