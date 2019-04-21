import React from 'react';
import PropTypes from 'prop-types';

const Accordion = (props) => {
  const {
    className,
    children,
  } = props;

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion'];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      {children}
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};

export default Accordion;
