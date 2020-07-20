import React from "react";
import classes from "./NavigationItem.module.css";
import {NavLink} from 'react-router-dom'

const NavigationItem = ({ children, link,exact}) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} activeClassName={classes.active} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
