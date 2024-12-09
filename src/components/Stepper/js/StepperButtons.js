import React from 'react';
import Button from '../../Button';
import { useStepper } from '../StepperContext';

const StepperButtons = ({nextBtnTxt, finishBtnTxt, backBtnTxt}) => {
  const {
    activeStep,
    steps,
    setActiveStep,
    setErrors,
    onFinish,
    stepValidator,
    stepErrMessage,
    setValidationAttempted
  } = useStepper();

  const isLastStep = activeStep === steps.length - 1;

  const goToNextStep = async () => {
    setValidationAttempted(true);
    const isNextStepAllowed = await stepValidator(steps[activeStep]?.props?.id);

    if (isNextStepAllowed) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prev) => prev + 1);
        setErrors((prev) => ({ ...prev, [activeStep]: null }));
      } else if (activeStep === steps.length - 1) {
        onFinish();
      }
      setValidationAttempted(false);
    } else {
      setErrors((prev) => ({
        ...prev,
        [activeStep]: stepErrMessage
      }));
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
      setValidationAttempted(false);
    }
  };

  return (
    <div className="stepper-buttons">
      {activeStep > 0 && (
        <Button onClick={goToPreviousStep} theme="secondary">
          {backBtnTxt}
        </Button>
      )}
      <Button onClick={goToNextStep} theme="primary">
        {isLastStep ? finishBtnTxt : nextBtnTxt}
      </Button>
    </div>
  );
};

export default StepperButtons;