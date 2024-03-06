import React from 'react';
import Message from './index';

function Component(props) {
  return (
    <Message {...props}>
      lorem ipsum
    </Message>
  );
}

describe('Message', () => {
  const infoThemeClass = 'tyk-message--info';
  const successThemeClass = 'tyk-message--success';
  const noMarginClass = 'no-margin';
  const selectors = {
    message: '.tyk-message',
    closeIcon: '.tyk-icon.tykon-x',
  };

  it('renders the component with the info theme by default', () => {
    cy.mount(<Component />)
      .get(selectors.message)
      .should('exist')
      .and('have.class', infoThemeClass);
  });

  it('can be rendered with a different theme', () => {
    cy.mount(<Component theme="success" />)
      .get(selectors.message)
      .should('have.class', successThemeClass);
  });

  it('can be rendered with no margins', () => {
    cy.mount(<Component noMargin />)
      .get(selectors.message)
      .should('have.class', noMarginClass);
  });

  it('can have custom classes', () => {
    const myClass = 'foo';
    cy.mount(<Component className={myClass} />)
      .get(selectors.message)
      .should('have.class', myClass);
  });

  it('renders an icon that calls the onClose callback when clicked', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Component onClose={onClose} />)
      .get(selectors.closeIcon)
      .click();

    cy.get('@onClose')
      .should('be.called');
  });
});
