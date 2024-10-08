import React from 'react';

const StepNumber = ({ number, isCompleted, isActive, hasError }) => {
  const classNames = ['step-number'];

  if (hasError) {
    classNames.push('error');
  } else if (isCompleted) {
    classNames.push('completed');
  } else if (isActive) {
    classNames.push('active');
  }

  return <div className={classNames.join(' ')}>{hasError ? '!' : number}</div>;
};

export default StepNumber;
