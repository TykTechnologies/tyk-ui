import React, { useState, useMemo } from "react";
import { StepperProvider } from "./StepperContext";
import StepList from "./js/StepList";
import StepperButtons from "./js/StepperButtons";
import "./stepper.css";

export const Stepper = ({
  children,
  onFinish,
  stepValidator,
  stepErrMessage = "ERROR",
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [validationAttempted, setValidationAttempted] = useState(false);

  const steps = useMemo(() => {
    return React.Children.toArray(children).filter(
      (child) => child.type.name === "Step"
    );
  }, [children]);

  const contextValue = {
    activeStep,
    setActiveStep,
    errors,
    setErrors,
    steps,
    onFinish,
    stepValidator,
    stepErrMessage,
    validationAttempted,
    setValidationAttempted,
  };

  return (
    <StepperProvider value={contextValue}>
      <div className="stepper-container">
        <StepList />
        <StepperButtons />
      </div>
    </StepperProvider>
  );
};

export const Step = ({ children }) => {
  return <>{children}</>;
};

Stepper.Step = Step;

export default Stepper;
