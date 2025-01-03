import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { StepperProvider } from "./StepperContext";
import StepList from "./js/StepList";
import { DefaultButtons } from "./js/StepperButtons";
import Buttons from "./js/Buttons";
import Step from "./js/Step";
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
  skipBtnTxt = "Skip",
  backBtnTxt = "Back",
  onChange = () => {},
  onSkip = null,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [validationAttempted, setValidationAttempted] = useState(false);
  const isHorizontal = orientation === "horizontal";

  const { steps, buttons } = useMemo(() => {
    const children_array = React.Children.toArray(children);
    return {
      steps: children_array.filter(
        (child) => child.type.displayName === "StepperStep"
      ),
      buttons: children_array.find(
        (child) => child.type.displayName === "StepperButtons"
      ) || (
        <DefaultButtons
          nextBtnTxt={nextBtnTxt}
          finishBtnTxt={finishBtnTxt}
          backBtnTxt={backBtnTxt}
          skipBtnTxt={skipBtnTxt}
        />
      ),
    };
  }, [children, nextBtnTxt, finishBtnTxt, backBtnTxt, skipBtnTxt]);

  const contextValue = {
    activeStep,
    setActiveStep,
    errors,
    setErrors,
    steps,
    onFinish,
    onChange,
    stepValidator,
    stepErrMessage,
    validationAttempted,
    setValidationAttempted,
    orientation,
    onSkip,
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
          {buttons}
        </div>
      </div>
    </StepperProvider>
  );
};

Stepper.Step = Step;
Stepper.Buttons = Buttons;

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
  onChange: PropTypes.func,
  /**
   * Callback triggered on step change.
   */
  onSkip: PropTypes.func,
  /**
   * Callback triggered on step skip.
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
  nextBtnTxt: PropTypes.string,
  finishBtnTxt: PropTypes.string,
  backBtnTxt: PropTypes.string,
};

Stepper.defaultProps = {
  stepErrMessage: "ERROR",
  orientation: "vertical",
};

export default Stepper;