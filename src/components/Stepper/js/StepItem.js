import React from "react";
import PropTypes from "prop-types";
import { useStepper } from "../StepperContext";
import StepNumber from "./StepNumber";

const StepItem = ({ step, index, isActive, isCompleted, hasError }) => {
  const { errors, orientation } = useStepper();
  const stepError = errors[index];

  const renderHorizontalStep = () => (
    <div
      className={`step-container-horizontal ${hasError ? "step-error" : ""}`}
    >
      <div className="step-header">
        <StepNumber
          number={index + 1}
          isCompleted={isCompleted}
          isActive={isActive}
          hasError={hasError}
        />
        <div className="step-content">
          <h3 className="step-title">{step.props.title}</h3>
          <p className="step-description">{step.props.description}</p>
        </div>
      </div>
      <br />
      <br />
      {isCompleted ? (
        <div className="progress-line" />
      ) : (
        <div className="progress-line-placeholder" />
      )}
    </div>
  );

  const renderVerticalStep = () => (
    <div
      className={`step-container-vertical ${isCompleted ? "completed" : ""} ${
        hasError ? "step-error" : ""
      }`}
    >
      <StepNumber
        number={index + 1}
        isCompleted={isCompleted}
        isActive={isActive}
        hasError={hasError}
      />
      <div className="step-content">
        <h3 className="step-title">{step.props.title}</h3>
        <p className="step-description">{step.props.description}</p>
        {isActive && React.cloneElement(step, { stepIndex: index })}
        {stepError && <p className="error-message">{stepError}</p>}
      </div>
    </div>
  );
  return orientation === "vertical"
    ? renderVerticalStep()
    : renderHorizontalStep();
};

StepItem.propTypes = {
  step: PropTypes.instanceOf(Object),
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isCompleted: PropTypes.bool,
  hasError: PropTypes.bool,
};

export default StepItem;
