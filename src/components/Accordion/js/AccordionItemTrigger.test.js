/* eslint-disable react/prop-types */
import React from 'react';

import AccordionItemContext from './AccordionItemContext';
import ItemTrigger from './AccordionItemTrigger';

function Component({
  collapsed = false,
  disabled = false,
  wrap = false,
}) {
  return (
    <AccordionItemContext.Provider value={{ collapsed, disabled, toggleChange: () => {} }}>
      <ItemTrigger wrap={wrap} />
    </AccordionItemContext.Provider>
  );
}

describe('ItemTrigger', () => {
  const selectors = {
    trigger: '.tyk-accordion__trigger',
    triggerWrapper: '.tyk-accordion__trigger-wrapper',
    iconCollapsed: '.fa-chevron-down',
    iconExpanded: '.fa-chevron-up',
  };

  it('renders an element to trigger the change of the collapsed state', () => {
    cy
      .mount(<Component />)
      .get(selectors.trigger)
      .should('exist');
  });

  it('renders different icons based on the collapsed state', () => {
    cy
      .mount(<Component />)
      .get(selectors.trigger)
      .find(selectors.iconExpanded)
      .should('exist');

    cy
      .mount(<Component collapsed />)
      .get(selectors.trigger)
      .find(selectors.iconCollapsed)
      .should('exist');
  });

  it('can render a wrapper around it', () => {
    cy
      .mount(<Component wrap />)
      .get(selectors.triggerWrapper)
      .should('exist');
  });
});
