/* eslint-disable react/prop-types, react/jsx-no-constructed-context-values */
import React from 'react';

import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import AccordionItemHeader from './AccordionItemHeader';

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
        <AccordionItemHeader className={className}>
          {children}
        </AccordionItemHeader>
      </AccordionItemContext.Provider>
    </AccordionContext.Provider>
  );
}

describe('AccordionItemHeader', () => {
  const selectors = {
    header: '.tyk-accordion__item-header',
    arrowAsTrigger: '.tyk-accordion__arrow-trigger',
    trigger: '.tyk-accordion__trigger',
  };

  it('renders an element as the header of the accordion item', () => {
    cy
      .mount(<Component>My Item</Component>)
      .get(selectors.header)
      .should('exist');
  });

  it('renders an arrow as trigger if usearrowastrigger is true', () => {
    cy
      .mount(<Component usearrowastrigger>My Item</Component>)
      .get(selectors.arrowAsTrigger)
      .should('exist');
  });

  it('can render the trigger on the left side', () => {
    cy
      .mount(<Component usearrowastrigger arrow={{ position: 'left', expandToContent: false }}>My Item</Component>)
      .get(`${selectors.trigger} + div`)
      .should('exist');
  });
});
