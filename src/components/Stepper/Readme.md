

```jsx
import React, { useState } from "react";
import Message from "../Message"

// Default content for each step
const DefaultStepContent = ({ title, onChange }) => (
  <div>
    <p>Hello {title}</p>
  </div>
);

// Define the steps for the stepper
const steps = [
  {
    title: 'Step 1',
    description: 'This is the first step',
    component: <DefaultStepContent title="Step 1" />,
  },
  {
    title: 'Step 2',
    description: 'This is the second step',
    component: <DefaultStepContent title="Step 2" />,
  },
  {
    title: 'Step 3',
    description: 'This is the third step',
    component: <DefaultStepContent title="Step 3" />,
  },
];

const StepperExample = () => {
  const [error, setError] = useState(null);
  const errorMessage = <Message theme="danger">ERROR</Message>

  return (
    <Stepper 
      steps={steps} 
      onFinish={() => console.log("LAST STEP")}
      onStepChange={(step) => {
        console.log("STEP CHANGED", step);
        if (step.title === "Step 2") {
          setError("Step 2 error");
        } else {
          setError(null);
        }
      }}
      error={error ? errorMessage : null}
    />
  );
};

<StepperExample />