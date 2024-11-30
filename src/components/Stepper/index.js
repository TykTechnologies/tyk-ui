import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { StepperProvider } from "./StepperContext";
import StepList from "./js/StepList";
import StepperButtons from "./js/StepperButtons";
import "./stepper.css";

const Stepper = ({
  children,
  onFinish,
  stepValidator,
  stepErrMessage = "ERROR",
  orientation = "vertical",
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
    orientation,
  };

  return (
    <StepperProvider value={contextValue}>
      <div className={`stepper-container stepper-${orientation}`}>
        <StepList />
        <div className="stepper-content-wrapper">
          {orientation === "horizontal" && steps[activeStep]}
          <StepperButtons />
        </div>
      </div>
    </StepperProvider>
  );
};

export const Step = ({ children }) => {
  return <>{children}</>;
};

Stepper.Step = Step;

Stepper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  onFinish: PropTypes.func.isRequired,
  stepValidator: PropTypes.func,
  stepErrMessage: PropTypes.string,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
};

Stepper.defaultProps = {
  stepErrMessage: "ERROR",
  orientation: "vertical",
};

Step.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Stepper;
