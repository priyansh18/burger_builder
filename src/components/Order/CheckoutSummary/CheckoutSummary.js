import React from "react";
import Burger from "./../../Burger/Burger";
import Button from "./../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '1.6rem',
        fontWeight: 700,
        color: '#1C1917',
        marginBottom: '4px'
      }}>Order Preview</h1>
      <p style={{
        color: '#78716C',
        fontSize: '0.9rem',
        marginBottom: '16px'
      }}>Here's what your burger looks like</p>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={ingredients} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '8px' }}>
        <Button btnType="Danger" clicked={checkoutCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={checkoutContinued}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
