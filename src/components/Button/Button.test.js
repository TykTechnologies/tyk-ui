import React from 'react';
import Button from './index';

describe('Button', () => {
  const buttonText = 'click me';

  it('renders the component with proper classes and attributes based on props', () => {
    cy
      .mount(
        <Button
          type="submit"
          className="foo bar"
          theme="success"
          display="inline"
          iconOnly
          size="lg"
          noStyle
        >
          {buttonText}
        </Button>,
      )
      .get('.tyk-button')
      .should('have.class', 'tyk-button--success')
      .and('have.class', 'foo')
      .and('have.class', 'bar')
      .and('have.class', 'inline')
      .and('have.class', 'tyk-button--icon-only')
      .and('have.class', 'tyk-button--lg')
      .and('have.class', 'tyk-button--no-style')
      .and('have.attr', 'type', 'submit');
  });

  it('renders an icon in the correct position', () => {
    cy
      .mount(
        <Button
          theme="default"
          iconType="copy"
          iconPosition="right"
        >
          {buttonText}
        </Button>,
      )
      .get('.tyk-button')
      .should('have.class', 'icon-right')

      .get('.tyk-icon')
      .and('have.class', 'fa-copy');
  });

  it('renders a custom "button"', () => {
    const customButtonText = 'custom button';
    cy
      .mount(
        <Button
          theme="default"
          customButton={<span>{customButtonText}</span>}
        >
          {buttonText}
        </Button>,
      );
    cy.contains(buttonText).should('not.exist');
    cy.contains(customButtonText);
  });

  it('renders an anchor', () => {
    const url = 'https://tyk.io';
    cy
      .mount(
        <Button
          theme="default"
          href={url}
        >
          {buttonText}
        </Button>,
      );

    cy.contains(buttonText)
      .should('match', 'a')
      .and('have.attr', 'href', url);
  });

  it('should call the onClick callback', () => {
    const onClick = cy.stub().as('onClick');

    cy
      .mount(
        <Button
          theme="default"
          onClick={onClick}
        >
          {buttonText}
        </Button>,
      );

    cy.contains(buttonText)
      .click();

    cy.get('@onClick')
      .should('be.called');
  });

  it('should not call the onClick callback if disabled', () => {
    const onClick = cy.stub().as('onClick');

    cy
      .mount(
        <Button
          theme="default"
          disabled
          onClick={onClick}
        >
          {buttonText}
        </Button>,
      );

    cy.contains(buttonText)
      .click({ force: true });

    cy.get('@onClick')
      .should('not.be.called');
  });
});
