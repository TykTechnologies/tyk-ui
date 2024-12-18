import React from "react";
import { useStepper } from "../StepperContext";
import StepItem from "./StepItem";

const StepList = () => {
  const { steps, activeStep, errors, orientation } = useStepper();

  return (
    <div className={`step-list-${orientation}`}>
      {steps.map((step, index) => (
        <div 
          key={step.props.id}
          className={`
            ${orientation === 'horizontal' ? 'step-container-horizontal' : ''}
            ${index < activeStep ? 'completed' : ''}
          `}
        >
          <StepItem
            key={step.id}
            step={step}
            index={index}
            isActive={index === activeStep}
            isCompleted={index < activeStep}
            hasError={!!errors[index]}
            isLastStep={index === steps.length - 1}
          />
        </div>
      ))}
    </div>
  );
};

export default StepList;