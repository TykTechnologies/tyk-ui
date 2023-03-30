import React from 'react';
import '../../index.scss';
import Collapsible from './index';

describe('Collapsible', () => {
  it('renders the component with proper classes based on props', () => {
    cy
      .mount(
        <Collapsible className="foo bar">
          <h1>The Content</h1>
        </Collapsible>,
      )
      .get('.collapse-wrapper')
      .find('> div')
      .should('have.class', 'foo')
      .and('have.class', 'bar')
      .and('be.visible');
  });

  it('renders the component with the content not visible if collapsed is true', () => {
    cy
      .mount(
        <Collapsible className="foo bar" collapsed>
          <div>The Content</div>
        </Collapsible>,
      )
      .get('.collapse-wrapper')
      .find('> div')
      .should('have.class', 'foo')
      .and('have.class', 'bar')
      .and('not.be.visible');
  });

  it('resets the height of the component on window resize', () => {
    const contentSelector = '.foo';
    const wrapperSelector = '.collapse-wrapper';
    const contentHeight = 20;
    const wrapperHeight = 40;

    cy
      .mount(
        <Collapsible className="foo bar">
          <div style={{ height: `${contentHeight}px` }}>The Content</div>
        </Collapsible>,
      )
      .get(contentSelector)
      .should('have.css', 'height')
      .and('eq', `${contentHeight}px`)
      .get(wrapperSelector)
      .invoke('height', wrapperHeight)
      .should('have.css', 'height')
      .and('eq', `${wrapperHeight}px`)
      .get(contentSelector)
      .should('have.css', 'height')
      .and('eq', `${contentHeight}px`)
      .viewport(300, 100)
      .get(wrapperSelector)
      .should('have.css', 'height')
      .and('eq', `${contentHeight}px`);
  });
});
