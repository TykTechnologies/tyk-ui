import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import ItemTrigger from './AccordionItemTrigger';

const AccordionItem = (props) => {
  const {
    collapsed,
    children,
    className,
    disabled,
  } = props;
  const { arrow } = useContext(AccordionContext);
  const [collapsedState, setCollapsedState] = useState(collapsed);

  const toggleChange = () => {
    if (disabled) {
      return;
    }

    setCollapsedState(!collapsedState);
  };

  const getCssClasses = () => {
    let cssClasses = ['tyk-accordion__item'];

    if (!arrow.expandToContent) {
      cssClasses.push('tyk-accordion__item--trigger-in-header');
    } else {
      cssClasses.push(`tyk-accordion__item--trigger-position-${arrow.position}`);
    }

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
        {arrow.expandToContent && (
          <ItemTrigger wrap />
        )}
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
