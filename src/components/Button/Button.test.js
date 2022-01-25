import React from 'react';
import { mount } from '@cypress/react';
import '../../index.scss';
import Button from './index';

describe('Button', () => {
  const buttonText = 'click me';

  it('renders the component with proper classes and attributes based on props', () => {
    mount(
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
    );

    cy.get('.tyk-button')
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
    mount(
      <Button
        theme="default"
        iconType="copy"
        iconFamily="tykon"
        iconPosition="right"
      >
        {buttonText}
      </Button>,
    );

    cy.get('.tyk-button')
      .should('have.class', 'icon-right')

      .get('.tyk-icon')
      .should('have.class', 'tykon')
      .and('have.class', 'tykon-copy');
  });

  it('renders a custom "button"', () => {
    const customButtonText = 'custom button';
    mount(
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
    mount(
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
    const onClick = cy.stub();

    mount(
      <Button
        theme="default"
        onClick={onClick}
      >
        {buttonText}
      </Button>,
    );

    cy.contains(buttonText)
      .click()
      .then(() => expect(onClick).to.be.called);
  });

  it('should not call the onClick callback if disabled', () => {
    const onClick = cy.stub();

    mount(
      <Button
        theme="default"
        disabled
        onClick={onClick}
      >
        {buttonText}
      </Button>,
    );

    cy.contains(buttonText)
      .click({ force: true })
      .then(() => expect(onClick).not.to.be.called);
  });
});
