/* eslint-disable react/prop-types */
import React from 'react';

import AccordionContext from './AccordionContext';
import AccordionItem from './AccordionItem';

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
      <AccordionItem collapsed={collapsed} disabled={disabled} className={className}>
        {children}
      </AccordionItem>
    </AccordionContext.Provider>
  );
}

describe('AccordionItem', () => {
  const content = 'My Content';
  const selectors = {
    item: '.tyk-accordion__item',
    trigger: '.tyk-accordion__trigger',
    itemActive: '.tyk-accordion__item--active',
  };

  it('renders an accordion item', () => {
    cy
      .mount(<Component>{content}</Component>)
      .get(selectors.item)
      .should('exist');
  });

  it('renders a trigger that expands to content', () => {
    cy
      .mount(<Component arrow={{ position: 'right', expandToContent: true }}>{content}</Component>)
      .get(selectors.trigger)
      .should('exist');
  });

  it('clicking on the trigger toggles the collapsed state of the item', () => {
    cy
      .mount(<Component arrow={{ position: 'right', expandToContent: true }}>{content}</Component>)
      .get(selectors.itemActive)
      .should('exist')
      .get(selectors.trigger)
      .click();

    cy.get(selectors.itemActive)
      .should('not.exist');
  });

  it('if disabled clicking on the trigger does not toggle the collapsed state of the item', () => {
    cy
      .mount(<Component arrow={{ position: 'right', expandToContent: true }} disabled>{content}</Component>)
      .get(selectors.itemActive)
      .should('exist')
      .get(selectors.trigger)
      .click();

    cy.get(selectors.itemActive)
      .should('exist');
  });
});
