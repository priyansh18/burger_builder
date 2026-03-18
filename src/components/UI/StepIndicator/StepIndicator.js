import React from "react";
import classes from "./StepIndicator.module.css";

const steps = ["Review", "Details", "Payment", "Done"];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className={classes.StepIndicator}>
      {steps.map((step, index) => {
        let status = "";
        if (index + 1 < currentStep) status = classes.Completed;
        else if (index + 1 === currentStep) status = classes.Active;

        return (
          <React.Fragment key={step}>
            <div className={`${classes.Step} ${status}`}>
              <div className={classes.Circle}>
                {index + 1 < currentStep ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={classes.Label}>{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`${classes.Line} ${index + 1 < currentStep ? classes.LineCompleted : ""}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepIndicator;
