import React, { Component } from "react";
import Order from "./../../components/Order/Order";
import axios from "../../axios-orders";
import ErrorHandler from "./../../hoc/ErrorHandler/ErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("./orders.json")
      .then((response) => {
        // console.log(response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { orders} = this.state;
    return <div>
      {orders.map(order=>(
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      ))}
    </div>;
  }
}

export default ErrorHandler(Orders, axios);
