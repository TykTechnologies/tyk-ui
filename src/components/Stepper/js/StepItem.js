import React from 'react';
import { useStepper } from '../StepperContext';
import StepNumber from './StepNumber';

const StepItem = ({
  step,
  index,
  isActive,
  isCompleted,
  hasError,
  isLastStep
}) => {
  const { errors } = useStepper();
  const stepError = errors[index];

  return (
    <div className="tyk-stepper">
      <div className={`step-container ${hasError ? 'step-error' : ''}`}>
        {!isLastStep && <div className={`stepper-line `} />}
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
    </div>
  );
};

export default StepItem;
