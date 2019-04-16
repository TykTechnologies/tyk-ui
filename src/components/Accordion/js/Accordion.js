import React from 'react';
import PropTypes from 'prop-types';

const Accordion = (props) => {
  const {
    children,
  } = props;

  return (
    <div className="tyk-accordion">
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
};

export default Accordion;
