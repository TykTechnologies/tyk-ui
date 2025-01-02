
```jsx
import React from 'react';
import Stepper from "./index.js"

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
      onChange={(step) => console.log("Step Changed : ", step)}
      onSkip={(step) => console.log("SKIP", step)}
    >
      <Stepper.Step id="personal-info" title="Step-1">
        <input type="text" placeholder="Full Name" />
      </Stepper.Step>

      <Stepper.Step id="address" title="Step-2">
        <input type="text" placeholder="Street Address" />
      </Stepper.Step>

      <Stepper.Step id="review" title="Step-3">
        <p>Please review your entered information before submitting.</p>
      </Stepper.Step>

      <Stepper.Step id="review2" title="Step-4">
        <p>Please review your entered information before submitting.</p>
      </Stepper.Step>
    </Stepper>
  );
};

<ExampleStepper />
```

```jsx
import React from "react";
import Stepper from "./index.js";

const ExampleStepper = () => {
  const handleFinish = () => {
    console.log("All steps completed!");
  };

  const validateStep = (stepId) => {
    return true;
  };

  return (
    <Stepper
      onFinish={handleFinish}
      stepValidator={validateStep}
      stepErrMessage="Please complete all required fields before proceeding."
      orientation="horizontal"
      backBtnTxt="Previous"
      nextBtnTxt="Next"
      finishBtnTxt="Done"
      onChange={(step) => console.log("Step Changed : ", step)}
    >
        <Stepper.Step id="personal-info" title="Step-1">
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
          <br />
          <input type="text" placeholder="Full Name" />
        </Stepper.Step>

        <Stepper.Step id="address" title="Step-2">
          <input type="text" placeholder="Street Address" />
        </Stepper.Step>

        <Stepper.Step id="review" title="Step-3">
          <p>Please review your entered information before submitting.</p>
        </Stepper.Step>

        <Stepper.Step id="review2" title="Step-4">
          <p>Please review your entered information before submitting.</p>
        </Stepper.Step>
    </Stepper>
  );
};

<ExampleStepper />
```