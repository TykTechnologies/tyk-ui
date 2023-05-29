import React from 'react';
import FixedWrapper from './index';

describe('FixedWrapper', () => {
  const selectors = {
    wrapper: '.tyk-fixed-wrapper',
    scrolled: '.tyk-fixed-wrapper--scrolled',
  };

  it('renders the component with proper classes based on props', () => {
    cy
      .mount(
        <FixedWrapper className="foo bar">
          <h1>The Content</h1>
        </FixedWrapper>,
      )
      .get(selectors.wrapper)
      .should('have.class', 'foo')
      .and('have.class', 'bar')
      .and('be.visible');
  });

  it('adds another class when the page is scrolled if the "showShadow" prop is true and removes it when scroll back to 0', () => {
    cy
      .mount(
        <div id="scroll-wrapper" style={{ height: '3000px' }}>
          <FixedWrapper showShadow>
            <h1>The Content</h1>
          </FixedWrapper>
        </div>,
      )
      .get(selectors.scrolled)
      .should('not.exist');

    cy.scrollTo(0, 500)
      .get(selectors.scrolled)
      .should('exist');

    cy.scrollTo(0, 0)
      .get(selectors.scrolled)
      .should('not.exist');
  });
});
