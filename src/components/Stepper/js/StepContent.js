import React from "react";

const StepContent = ({ step, index, currentStep, children }) => {
  const isStepComplete = index < currentStep;

  return (
    <div
      className={`step ${index === currentStep ? "active" : ""} ${
        isStepComplete ? "completed" : ""
      }`}
    >
      {children}
      <div className="step-content">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        {index === currentStep && (
          <div className="step-component">{step.component}</div>
        )}
      </div>
    </div>
  );
};

export default StepContent;
