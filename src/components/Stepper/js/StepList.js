import React from 'react';
import { useStepper } from '../StepperContext';
import StepItem from './StepItem';

const StepList = () => {
  const { steps, activeStep, errors } = useStepper();

  return (
    <div>
      {steps.map((step, index) => (
        <StepItem
          key={step}
          step={step}
          index={index}
          isActive={index === activeStep}
          isCompleted={index < activeStep}
          hasError={!!errors[index]}
          isLastStep={index === steps.length - 1}
        />
      ))}
    </div>
  );
};

export default StepList;