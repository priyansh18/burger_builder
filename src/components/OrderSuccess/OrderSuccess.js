import React, { useState, useEffect } from "react";
import classes from "./OrderSuccess.module.css";

const OrderSuccess = ({ price, onGoHome, onViewOrders }) => {
  const [showCheck, setShowCheck] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 300);
    setTimeout(() => setShowContent(true), 800);
    setTimeout(() => setShowConfetti(true), 400);
  }, []);

  return (
    <div className={classes.OrderSuccess}>
      {showConfetti && (
        <div className={classes.Confetti}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={classes.ConfettiPiece} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
              backgroundColor: ['#E8901E', '#16A34A', '#DC2626', '#3B82F6', '#8B5CF6', '#F59E0B'][i % 6],
            }} />
          ))}
        </div>
      )}
      <div className={`${classes.CheckCircle} ${showCheck ? classes.CheckCircleVisible : ''}`}>
        <svg className={classes.CheckSvg} viewBox="0 0 52 52">
          <circle className={classes.CheckCircleBg} cx="26" cy="26" r="25" fill="none" />
          <path className={classes.CheckPath} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <div className={`${classes.Content} ${showContent ? classes.ContentVisible : ''}`}>
        <h1>Order Confirmed!</h1>
        <p className={classes.Subtitle}>Your delicious burger is being prepared</p>
        <div className={classes.OrderDetails}>
          <div className={classes.DetailRow}><span>Order ID</span><span className={classes.DetailValue}>#BRG{Math.floor(Math.random() * 90000 + 10000)}</span></div>
          <div className={classes.DetailRow}><span>Amount Paid</span><span className={classes.DetailValue}>Rs. {price.toFixed(2)}</span></div>
          <div className={classes.DetailRow}><span>Estimated Delivery</span><span className={classes.DetailValue}>25-30 mins</span></div>
        </div>
        <div className={classes.Timeline}>
          <div className={`${classes.TimelineItem} ${classes.TimelineActive}`}><div className={classes.TimelineDot}></div><div><strong>Order Placed</strong><span>Just now</span></div></div>
          <div className={classes.TimelineItem}><div className={classes.TimelineDot}></div><div><strong>Preparing</strong><span>Starting soon</span></div></div>
          <div className={classes.TimelineItem}><div className={classes.TimelineDot}></div><div><strong>Out for Delivery</strong><span>Estimated 20 mins</span></div></div>
        </div>
        <div className={classes.Actions}>
          <button className={classes.PrimaryBtn} onClick={onGoHome}>Build Another Burger</button>
          <button className={classes.SecondaryBtn} onClick={onViewOrders}>View My Orders</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
