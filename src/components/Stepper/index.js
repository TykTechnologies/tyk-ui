import React, { useState, useEffect } from "react";
import StepIndicator from "./js/StepIndicator";
import StepContent from "./js/StepContent";
import NavigationButtons from "./js/NavigationButtons";

const Stepper = ({
  steps,
  isDisableFinish = false,
  onFinish = () => {},
  onStepChange = () => {},
  finishBtnText = "Finish",
  error,
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
    <div className="tyk-stepper">
      <div className="stepper-container">
        <div className="steps-container">
          {steps.map((step, index) => (
            <StepContent
              key={step.title || index}
              step={step}
              index={index}
              currentStep={currentStep}
              error={error}
            >
              <StepIndicator
                index={index}
                currentStep={currentStep}
                stepsLength={steps.length}
              />
            </StepContent>
          ))}
        </div>
        <NavigationButtons
          currentStep={currentStep}
          isLastStep={isLastStep}
          isDisableFinish={isDisableFinish}
          isAllowNext={!error}
          handleBack={handleBack}
          handleNext={handleNext}
          onFinish={onFinish}
          finishBtnText={finishBtnText}
        />
      </div>
    </div>
  );
};

export default Stepper;
