import React, { useState } from 'react';
import PropTypes from 'prop-types';

import AccordionItemContext from './AccordionItemContext';

const AccordionItem = (props) => {
  const {
    collapsed,
    children,
    className,
    disabled,
  } = props;
  const [collapsedState, setCollapsedState] = useState(collapsed);

  const toggleChange = () => {
    if (disabled) {
      return;
    }

    setCollapsedState(!collapsedState);
  };

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion__item'];

    if (className) {
      cssClasses = cssClasses.concat(className.split(' '));
    }

    if (collapsedState === false) {
      cssClasses.push('tyk-accordion__item--active');
    }

    return cssClasses.join(' ');
  };

  return (
    <div className={getCssClasses()}>
      <AccordionItemContext.Provider
        value={{
          collapsed: collapsedState,
          disabled,
          toggleChange,
        }}
      >
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
};

AccordionItem.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  collapsed: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

AccordionItem.defaultProps = {
  collapsed: false,
};

export default AccordionItem;
