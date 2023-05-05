import React from 'react';

import Accordion from './index';

describe('AccordionItem', () => {
  const selectors = {
    accordion: '.tyk-accordion',
  };

  it('renders an accordion', () => {
    cy
      .mount(
        <Accordion
          className="test-accordion-class"
          usearrowastrigger
          arrow={{ position: 'left' }}
        >
          <Accordion.Item disabled>
            <Accordion.Item.Header>
              Header 1
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              Content 1
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              Header 2
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              Content 2
            </Accordion.Item.Content>
          </Accordion.Item>
          <Accordion.Item>
            <Accordion.Item.Header>
              Header 3
            </Accordion.Item.Header>
            <Accordion.Item.Content>
              Content 3
            </Accordion.Item.Content>
          </Accordion.Item>
        </Accordion>,
      )
      .get(selectors.accordion)
      .should('exist');
  });
});
