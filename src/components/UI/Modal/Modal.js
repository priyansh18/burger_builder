import React from "react";
import classes from "./Modal.module.css";
import BackDrop from './../BackDrop/BackDrop';

const Modal = ({ children, show,modalClosed }) => {
  return (
    <div>
      <BackDrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
