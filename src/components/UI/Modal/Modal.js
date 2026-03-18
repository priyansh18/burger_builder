import React from "react";
import classes from "./Modal.module.css";
import BackDrop from './../BackDrop/BackDrop';

const Modal = ({ children, show, modalClosed }) => {
  return (
    <div>
      <BackDrop show={show} clicked={modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.95)",
          opacity: show ? "1" : "0",
          pointerEvents: show ? "auto" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
