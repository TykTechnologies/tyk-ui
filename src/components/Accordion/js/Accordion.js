import React from 'react';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';

const Accordion = (props) => {
  const {
    className,
    children,
    usearrowastrigger,
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
      <AccordionContext.Provider
        value={{
          usearrowastrigger,
        }}
      >
        {children}
      </AccordionContext.Provider>
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
  usearrowastrigger: PropTypes.bool,
};

Accordion.defaultProps = {
  usearrowastrigger: false,
};

export default Accordion;
