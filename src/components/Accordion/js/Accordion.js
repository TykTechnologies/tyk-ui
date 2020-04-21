import React from 'react';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';

const Accordion = (props) => {
  const {
    className,
    children,
    usearrowastrigger,
    arrow = { position: 'right', expandToContent: false },
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
          arrow,
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
  arrow: PropTypes.shape({
    position: PropTypes.oneOf('left', 'right'),
    expandToContent: PropTypes.bool,
  }),
};

Accordion.defaultProps = {
  usearrowastrigger: false,
};

export default Accordion;
