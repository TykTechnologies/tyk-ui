import React, { useState, useEffect } from "react";
import Button from "../Button";
import Icon from "../Icon";

const Stepper = ({
  steps,
  isDisableFinish = false,
  onFinish = () => {},
  onStepChange = () => {},
  finishBtnText = "Finish",
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const initialStep = steps.findIndex((step) => step.isInitial);
    setCurrentStep(initialStep !== -1 ? initialStep : 0);
  }, [steps]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange(steps[nextStep]);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange(steps[prevStep]);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="Stepper-container">
      <div className="steps-container">
        {steps.map((step, index) => {
          const isStepComplete = index < currentStep;
          return (
            <div
              key={index}
              className={`step ${index === currentStep ? "active" : ""} ${
                isStepComplete ? "completed" : ""
              }`}
            >
              <div className="step-indicator">
                <div className={`step-number`}>
                  {isStepComplete ? <Icon type="check" /> : index + 1}
                </div>
                {index < steps.length - 1 && <div className="step-line"></div>}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index === currentStep && (
                  <div className="step-component">{step.component}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
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
    </div>
  );
};

export default Stepper;