import React from 'react';
import PropTypes from 'prop-types';

const StepNumber = ({ number, isCompleted, isActive, hasError }) => {
  const classNames = [
    'step-number',
    isCompleted ? 'completed' : '',
    isActive ? 'active' : '',
    hasError ? 'error' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <span>{hasError ? '!' : number}</span>
    </div>
  );
};

StepNumber.propTypes = {
  number: PropTypes.number,
  isCompleted: PropTypes.bool,
  isActive: PropTypes.bool,
  hasError: PropTypes.bool
};

export default StepNumber;