import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './js/AccordionItem';
import AccordionItemHeader from './js/AccordionItemHeader';
import AccordionItemContent from './js/AccordionItemContent';
import AccordionContext from './js/AccordionContext';

function Accordion({
  className,
  children,
  usearrowastrigger,
  arrow = { position: 'right', expandToContent: false },
}) {
  const classes = [
    'tyk-accordion',
    className,
  ].filter(Boolean).join(' ');

  const contextValue = useMemo(() => ({
    usearrowastrigger,
    arrow,
  }), [usearrowastrigger, arrow]);

  return (
    <div className={classes}>
      <AccordionContext.Provider value={contextValue}>
        {children}
      </AccordionContext.Provider>
    </div>
  );
}

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
    position: PropTypes.oneOf(['left', 'right']),
    expandToContent: PropTypes.bool,
  }),
};

Accordion.defaultProps = {
  usearrowastrigger: false,
};

// For Readme.md : Start
Accordion.Item = AccordionItem;
Accordion.Item.Header = AccordionItemHeader;
Accordion.Item.Content = AccordionItemContent;
// For Readme.md : End

export default Accordion;
