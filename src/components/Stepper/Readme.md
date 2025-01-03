## Custom buttons using Render Props method
```jsx
import React from "react";
import Button from "../Button";
import Confirm from "../Confirm";
import Stepper from "./index";

const MyStepperComponent = () => {
  const handleFinish = () => {
    console.log("Finished!");
  };

  const validateStep = (stepId) => {
    return true;
  };

  return (
    <Stepper onFinish={handleFinish} stepValidator={validateStep}>
      <Stepper.Step
        title="Step 1"
        description="First step"
        id="step1"
      ></Stepper.Step>

      <Stepper.Step
        title="Step 2"
        description="Second step"
        id="step2"
      ></Stepper.Step>

      <Stepper.Buttons>
        {({ goToNextStep, goToPreviousStep, isLastStep, activeStep, stepId }) => (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              gap: "8px",
              marginLeft: 0,
            }}
          >
      {   stepId !== 'step2' &&    <Confirm
              title="Console log"
              description="Are u sure u want to console log?"
            >
              {(confirm) => (
                <Button
                  onClick={confirm((event) => {
                    console.log("Button clicked", {event, activeStep, stepId});
                  })}
                  theme="secondary"
                >
                  Skip (Confirm)
                </Button>
              )}
            </Confirm>}

            {activeStep > 0 && (
              <Button onClick={goToPreviousStep} theme="secondary">
                Back
              </Button>
            )}
            <Button onClick={goToNextStep} theme="primary">
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </div>
        )}
      </Stepper.Buttons>
    </Stepper>
  );
};

<MyStepperComponent />;
```

## Vertical Stepper

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

## Horizontal Stepper
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
