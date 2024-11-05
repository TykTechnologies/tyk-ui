import { createContext, useContext } from 'react';

const StepperContext = createContext();

export const StepperProvider = StepperContext.Provider;

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within a Stepper component');
  }
  return context;
};