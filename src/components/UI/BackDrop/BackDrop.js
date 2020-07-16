import React from "react";
import classes from './BackDrop.module.css'

const BackDrop = ({ show,clicked}) => {
  return show ? <div className={classes.BackDrop} onClick={clicked}></div> : null;
};

export default BackDrop;
