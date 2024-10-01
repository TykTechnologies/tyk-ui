import React from "react";
import Icon from "../../Icon";

const StepIndicator = ({
  index,
  currentStep,
  stepsLength,
  isActive,
  error,
}) => {
  const isStepComplete = index < currentStep;
  const isShowStepLine = index < stepsLength - 1;
  const isErroredStep = isActive && error;

  return (
    <div className="step-indicator">
      <div
        className={`step-number ${isStepComplete ? "completed" : ""} ${
          isActive ? "active" : ""
        } ${isErroredStep ? "error-step" : ""}`}
      >
        {isStepComplete ? (
          <Icon type="check" />
        ) : isErroredStep ? (
          <Icon type="exclamation" />
        ) : (
          <span className="step-index">{index + 1}</span>
        )}
      </div>
      {isShowStepLine && <div className="step-line"></div>}
    </div>
  );
};

export default StepIndicator;
