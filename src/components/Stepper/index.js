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
  contentHeight,
  nextBtnTxt = "Continue",
  finishBtnTxt = "Finish",
  backBtnTxt = "Back",
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [validationAttempted, setValidationAttempted] = useState(false);
  const isHorizontal = orientation === "horizontal";

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
          {isHorizontal && (
            <div
              className="no-scrollbar"
              style={
                isHorizontal && contentHeight
                  ? {
                      height: contentHeight,
                      maxHeight: contentHeight,
                      overflow: "scroll",
                    }
                  : {}
              }
            >
              {isHorizontal && steps[activeStep]}
            </div>
          )}
          <StepperButtons
            nextBtnTxt={nextBtnTxt}
            finishBtnTxt={finishBtnTxt}
            backBtnTxt={backBtnTxt}
          />
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
  /**
   * The steps of the stepper. Should be Stepper.Step components.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  /**
   * Function to be called when the stepper is finished.
   */
  onFinish: PropTypes.func.isRequired,
  /**
   * Function to validate each step. Should return true if valid, false otherwise.
   */
  stepValidator: PropTypes.func,
  /**
   * Error message to display when a step is invalid.
   */
  stepErrMessage: PropTypes.string,
  /**
   * height of the content (for horizontal stepper)
   */
  contentHeight: PropTypes.string,
  /**
   * Stepper orientation
   */
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
