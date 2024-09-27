```js

const DefaultStepContent = ({ title }) => (
  <div>
    <h4>{title}</h4>
    <p>Hello {title}</p>
  </div>
);

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

<Stepper 
  steps={steps} 
  onFinish={() => console.log("LAST STEP")}
  onStepChange={(s) => console.log("STEP CHANGED", s)}
/>
```