import React, { useEffect } from "react";
import Order from "./../../components/Order/Order";
import axios from "../../axios-orders";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import { fetchOrders } from "./../../store/actions/index";
import Spinner from "./../../components/UI/Spinner/Spinner";

const Orders = ({ token, userId, orders, loading, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(token, userId);
  });

  let all_orders = <Spinner />;
  if (!loading) {
    all_orders = orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
  }
  return <div>{all_orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
