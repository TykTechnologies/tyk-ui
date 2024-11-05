import React from 'react';
import PropTypes from 'prop-types';

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

StepNumber.propTypes = {
  number: PropTypes.number,
  isCompleted: PropTypes.bool,
  isActive: PropTypes.bool,
  hasError: PropTypes.bool
};

export default StepNumber;
