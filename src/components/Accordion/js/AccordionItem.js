import React, {
  useMemo, useState, useContext, forwardRef,
} from 'react';
import PropTypes from 'prop-types';

import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import ItemTrigger from './AccordionItemTrigger';

const AccordionItem = forwardRef(function AccordionItem (
  {
    collapsed: collapsedProp = false,
    children,
    className,
    disabled,
  },
  ref,
) {
  const { arrow } = useContext(AccordionContext);
  const [collapsed, setCollapsed] = useState(collapsedProp);

  const toggleChange = () => {
    if (disabled) {
      return;
    }

    setCollapsed(!collapsed);
  };

  const classes = useMemo(() => [
    'tyk-accordion__item',
    arrow.expandToContent
      ? `tyk-accordion__item--trigger-position-${arrow.position}`
      : 'tyk-accordion__item--trigger-in-header',
    className,
    collapsed === false && 'tyk-accordion__item--active',
  ].filter(Boolean).join(' '), [arrow, className, collapsed]);

  const contextValue = useMemo(() => ({
    collapsed,
    disabled,
    toggleChange,
  }), [collapsed, disabled, toggleChange]);

  return (
    <div ref={ref} className={classes}>
      <AccordionItemContext.Provider value={contextValue}>
        {arrow.expandToContent && (
          <ItemTrigger wrap />
        )}
        {children}
      </AccordionItemContext.Provider>
    </div>
  );
});

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

export default AccordionItem;
