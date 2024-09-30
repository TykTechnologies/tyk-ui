import React from "react";
import Icon from "../../Icon";

const StepIndicator = ({ index, currentStep, stepsLength }) => {
  const isStepComplete = index < currentStep;
  const isShowStepLine = index < stepsLength - 1;

  return (
    <div className="step-indicator">
      <div className={`step-number`}>
        {isStepComplete ? <Icon type="check" /> : index + 1}
      </div>
      {isShowStepLine && <div className="step-line"></div>}
    </div>
  );
};

export default StepIndicator;
