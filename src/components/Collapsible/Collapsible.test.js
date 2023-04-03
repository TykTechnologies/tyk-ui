import React, { useState } from 'react';
import '../../index.scss';
import Collapsible from './index';

describe('Collapsible', () => {
  const wrapperSelector = '.collapse-wrapper';

  it('renders the component with proper classes based on props', () => {
    cy
      .mount(
        <Collapsible className="foo bar">
          <h1>The Content</h1>
        </Collapsible>,
      )
      .get(wrapperSelector)
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
      .get(wrapperSelector)
      .find('> div')
      .should('have.class', 'foo')
      .and('have.class', 'bar')
      .and('not.be.visible');
  });

  it('resets the height of the component on window resize', () => {
    const contentSelector = '.foo';
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

  it('"responds" to dynamic content', () => {
    const contentSmall = 'lorem ipsum';
    const contentLarge = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    const epsilon = 40;

    function Component() {
      const [content, setContent] = useState(contentSmall);

      return (
        <div style={{ inlineSize: '200px' }}>
          <button type="button" onClick={() => setContent(contentSmall)}>small</button>
          <button type="button" onClick={() => setContent(contentLarge)}>large</button>
          <Collapsible>
            <div>{content}</div>
          </Collapsible>
        </div>
      );
    }

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy
      .mount(<Component />)
      .get(wrapperSelector)
      .invoke('height')
      .should('be.lt', epsilon)

      .get('button')
      .contains('large')
      .click()
      .wait(200)
      .get(wrapperSelector)
      .invoke('height')
      .should('be.gt', epsilon)

      .get('button')
      .contains('small')
      .click()
      .wait(200)
      .get(wrapperSelector)
      .invoke('height')
      .should('be.lt', epsilon);
  });
});
