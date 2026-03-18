import React from "react";
import Button from "./../../UI/Button/Button";

const OrderSummary = ({ ingredients, price, purchaseCanceled, purchaseContinue }) => {
  const ingredientSummary = Object.keys(ingredients).map((ingredientKey) => {
    return (
      <li key={ingredientKey} style={{
        padding: '10px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #F5F5F4',
        fontSize: '0.92rem'
      }}>
        <span style={{
          textTransform: "capitalize",
          color: '#57534E',
          fontWeight: 500,
        }}>{ingredientKey}</span>
        <span style={{
          fontWeight: 700,
          fontSize: '1rem',
          color: '#0C0A09',
          background: '#FEF3E2',
          padding: '2px 12px',
          borderRadius: '20px',
          minWidth: '30px',
          textAlign: 'center',
        }}>{ingredients[ingredientKey]}</span>
      </li>
    );
  });
  return (
    <div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '1.6rem',
        marginBottom: '4px',
        color: '#0C0A09',
        fontWeight: 700,
      }}>Order Summary</h3>
      <p style={{ color: '#A8A29E', fontSize: '0.85rem', marginBottom: '22px' }}>
        Review your delicious creation
      </p>
      <ul style={{ listStyle: 'none', padding: 0, marginBottom: '22px' }}>{ingredientSummary}</ul>
      <div style={{
        background: 'linear-gradient(135deg, #0D0705, #1A0F0A)',
        borderRadius: '14px',
        padding: '18px 22px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</span>
        <span style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#F59E0B',
          fontFamily: "'Playfair Display', Georgia, serif"
        }}>Rs. {price.toFixed(2)}</span>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Button btnType="Danger" clicked={purchaseCanceled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={purchaseContinue}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
