import React, { useState } from "react";
import classes from "./PaymentGateway.module.css";

const PaymentGateway = ({ price, onPaymentSuccess, onPaymentCancel }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const isFormValid = () => {
    if (paymentMethod === "cod") return true;
    if (paymentMethod === "upi") return true;
    return (
      cardNumber.replace(/\s/g, "").length === 16 &&
      cardName.trim().length > 0 &&
      expiry.length === 5 &&
      cvv.length === 3
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2500);
  };

  const getCardType = () => {
    const num = cardNumber.replace(/\s/g, "");
    if (num.startsWith("4")) return "VISA";
    if (num.startsWith("5")) return "MC";
    if (num.startsWith("3")) return "AMEX";
    return null;
  };

  if (processing) {
    return (
      <div className={classes.PaymentGateway}>
        <div className={classes.Processing}>
          <div className={classes.ProcessingSpinner}>
            <div className={classes.SpinnerRing}></div>
          </div>
          <h3>Processing Payment</h3>
          <p>Please wait while we securely process your payment...</p>
          <div className={classes.ProcessingSteps}>
            <div className={`${classes.ProcessingStep} ${classes.StepActive}`}>
              <span className={classes.ProcessingDot}></span>
              Verifying card details
            </div>
            <div className={classes.ProcessingStep}>
              <span className={classes.ProcessingDot}></span>
              Authorizing payment
            </div>
            <div className={classes.ProcessingStep}>
              <span className={classes.ProcessingDot}></span>
              Confirming order
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.PaymentGateway}>
      <div className={classes.Header}>
        <div className={classes.SecureBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Secure Payment</span>
        </div>
        <div className={classes.Amount}>
          <span className={classes.AmountLabel}>Total</span>
          <span className={classes.AmountValue}>Rs. {price.toFixed(2)}</span>
        </div>
      </div>

      <div className={classes.MethodTabs}>
        <button className={`${classes.MethodTab} ${paymentMethod === "card" ? classes.MethodTabActive : ""}`} onClick={() => setPaymentMethod("card")} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          Card
        </button>
        <button className={`${classes.MethodTab} ${paymentMethod === "upi" ? classes.MethodTabActive : ""}`} onClick={() => setPaymentMethod("upi")} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
          UPI
        </button>
        <button className={`${classes.MethodTab} ${paymentMethod === "cod" ? classes.MethodTabActive : ""}`} onClick={() => setPaymentMethod("cod")} type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          COD
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {paymentMethod === "card" && (
          <div className={classes.CardForm}>
            <div className={classes.CardPreview}>
              <div className={classes.CardChip}></div>
              <div className={classes.CardNumber}>{cardNumber || "---- ---- ---- ----"}</div>
              <div className={classes.CardBottom}>
                <div className={classes.CardHolder}>{cardName || "YOUR NAME"}</div>
                <div className={classes.CardExpiry}>{expiry || "MM/YY"}</div>
              </div>
              {getCardType() && <div className={classes.CardBrand}>{getCardType()}</div>}
            </div>
            <div className={classes.FormGroup}>
              <label>Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(formatCardNumber(e.target.value))} maxLength="19" className={classes.FormInput} />
            </div>
            <div className={classes.FormGroup}>
              <label>Cardholder Name</label>
              <input type="text" placeholder="John Doe" value={cardName} onChange={(e) => setCardName(e.target.value.toUpperCase())} className={classes.FormInput} />
            </div>
            <div className={classes.FormRow}>
              <div className={classes.FormGroup}>
                <label>Expiry</label>
                <input type="text" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(formatExpiry(e.target.value))} maxLength="5" className={classes.FormInput} />
              </div>
              <div className={classes.FormGroup}>
                <label>CVV</label>
                <input type="password" placeholder="***" value={cvv} onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ""))} maxLength="3" className={classes.FormInput} />
              </div>
            </div>
          </div>
        )}
        {paymentMethod === "upi" && (
          <div className={classes.CardForm}>
            <div className={classes.FormGroup}>
              <label>UPI ID</label>
              <input type="text" placeholder="yourname@upi" className={classes.FormInput} />
            </div>
            <p className={classes.UpiNote}>You will receive a payment request on your UPI app</p>
          </div>
        )}
        {paymentMethod === "cod" && (
          <div className={classes.CodSection}>
            <div className={classes.CodIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle><path d="M6 12h.01M18 12h.01"></path></svg>
            </div>
            <p className={classes.CodText}>Pay with cash when your order arrives</p>
            <p className={classes.CodNote}>Please keep exact change ready</p>
          </div>
        )}
        <div className={classes.Actions}>
          <button type="button" className={classes.CancelBtn} onClick={onPaymentCancel}>Back</button>
          <button type="submit" className={classes.PayBtn} disabled={!isFormValid()}>
            {paymentMethod === "cod" ? "Place Order" : `Pay Rs. ${price.toFixed(2)}`}
          </button>
        </div>
      </form>
      <div className={classes.Trust}>
        <span>256-bit SSL Encrypted</span>
        <span>|</span>
        <span>PCI DSS Compliant</span>
      </div>
    </div>
  );
};

export default PaymentGateway;
