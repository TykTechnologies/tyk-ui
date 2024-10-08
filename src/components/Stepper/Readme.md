
```jsx
import React from 'react';

const ExampleStepper = () => {
  const handleFinish = () => {
    console.log('All steps completed!');
  };

  const validateStep = (stepId) => {
    return true;
  };

  return (
    <Stepper
      onFinish={handleFinish}
      stepValidator={validateStep}
      stepErrMessage="Please complete all required fields before proceeding."
    >
      <Stepper.Step id="personal-info" title="Step-1" description="Enter your name">
        <input type="text" placeholder="Full Name" />
      </Stepper.Step>

      <Stepper.Step id="address" title="Step-2" description="Provide your address">
        <input type="text" placeholder="Street Address" />
      </Stepper.Step>

      <Stepper.Step id="review" title="Step-3" description="Review your information">
        <p>Please review your entered information before submitting.</p>
      </Stepper.Step>
    </Stepper>
  );
};

<ExampleStepper />