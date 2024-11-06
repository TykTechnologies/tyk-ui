/* eslint-disable react/prop-types */
import React from 'react';

import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import AccordionItemContent from './AccordionItemContent';

function Component({
  usearrowastrigger = false,
  arrow = { position: 'right', expandToContent: false },
  collapsed = false,
  disabled = false,
  className,
  children,
}) {
  return (
    <AccordionContext.Provider value={{ usearrowastrigger, arrow }}>
      <AccordionItemContext.Provider value={{ collapsed, disabled, toggleChange: () => {} }}>
        <AccordionItemContent className={className}>
          {children}
        </AccordionItemContent>
      </AccordionItemContext.Provider>
    </AccordionContext.Provider>
  );
}

describe('AccordionItemContent', () => {
  const selectors = {
    collapseWrapper: '.collapse-wrapper',
  };

  it('renders content inside a collapsible component', () => {
    const content = 'My Content';
    cy
      .mount(<Component>{content}</Component>)
      .get(selectors.collapseWrapper)
      .contains(content)
      .should('exist');
  });
});
