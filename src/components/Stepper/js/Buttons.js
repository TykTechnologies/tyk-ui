import React from "react";
import PropTypes from "prop-types";
import { useStepper } from "../StepperContext";

const Buttons = ({ children }) => {
  const {
    activeStep,
    steps,
    setActiveStep,
    setErrors,
    onFinish,
    onChange,
    onSkip,
    stepValidator,
    stepErrMessage,
    setValidationAttempted,
  } = useStepper();

  const isLastStep = activeStep === steps.length - 1;

  const goToNextStep = async () => {
    setValidationAttempted(true);
    const isNextStepAllowed = await stepValidator(steps[activeStep]?.props?.id);

    if (isNextStepAllowed) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
        setErrors((prev) => ({ ...prev, [activeStep]: null }));
        onChange(steps[activeStep]?.props?.id);
      } else if (activeStep === steps.length - 1) {
        onFinish();
      }
      setValidationAttempted(false);
    } else {
      setErrors((prev) => ({
        ...prev,
        [activeStep]: stepErrMessage,
      }));
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      setValidationAttempted(false);
      onChange(steps[activeStep]?.props?.id);
    }
  };

  const onSkipStep = () => {
    onSkip(steps[activeStep]?.props?.id);
  };

  return (
    <div className="stepper-buttons">
      {children({
        goToNextStep,
        goToPreviousStep,
        onSkipStep,
        isLastStep,
        activeStep,
        stepId: steps[activeStep]?.props?.id || "",
      })}
    </div>
  );
};

Buttons.displayName = "StepperButtons";
Buttons.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Buttons;
