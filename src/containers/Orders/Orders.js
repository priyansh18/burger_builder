import React, { Component } from "react";
import Order from "./../../components/Order/Order";
import axios from "../../axios-orders";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import { fetchOrders } from "./../../store/actions/index";
import Spinner from "./../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const { orders, loading } = this.props;
    let all_orders = <Spinner />;
    if (!loading) {
      all_orders = orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
    }
    return <div>{all_orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
