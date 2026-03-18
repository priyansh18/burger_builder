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
  }, [onFetchOrders, token, userId]);

  let all_orders = <Spinner />;
  if (!loading) {
    all_orders = orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />);
  }
  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '1.8rem',
        fontWeight: 700,
        color: '#1C1917',
        marginBottom: '4px'
      }}>Your Orders</h1>
      <p style={{
        color: '#78716C',
        fontSize: '0.9rem',
        marginBottom: '24px'
      }}>Track all your previous orders</p>
      {all_orders}
    </div>
  );
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
