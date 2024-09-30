import React from "react";

const StepContent = ({ step, index, currentStep, children, error }) => {
  const isStepComplete = index < currentStep;
  const isActive = index === currentStep;
  function getStepClassName() {
    return [
      "step",
      index === currentStep ? "active" : "",
      isStepComplete ? "completed" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <div className={getStepClassName()}>
      {children}
      <div className={`step-content ${error && isActive ? "error-step" : ""}`}>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        {index === currentStep && <div>{error}</div>}
        {index === currentStep && (
          <div className={`"step-component"`}>{step.component}</div>
        )}
      </div>
    </div>
  );
};

export default StepContent;
