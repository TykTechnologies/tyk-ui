import React from "react";
import Button from "../../Button";

const NavigationButtons = ({
  currentStep,
  isLastStep,
  isDisableFinish,
  handleBack,
  handleNext,
  onFinish,
  finishBtnText,
}) => {
  return (
    <div className="navigation-buttons">
      {currentStep >= 1 && (
        <Button theme="secondary" onClick={handleBack}>
          Back
        </Button>
      )}
      &nbsp;
      <Button
        theme="primary"
        onClick={isLastStep ? onFinish : handleNext}
        disabled={isDisableFinish && isLastStep}
      >
        {isLastStep ? finishBtnText : "Continue"}
      </Button>
    </div>
  );
};

export default NavigationButtons;
