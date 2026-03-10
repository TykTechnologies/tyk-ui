import React from 'react';
import MaskedInput from './index';

describe('MaskedInput', () => {
  describe('non-password type', () => {
    it('renders a regular text input unchanged', () => {
      cy.mount(
        <MaskedInput
          type="text"
          value="hello"
        />,
      );

      cy.get('input')
        .should('have.attr', 'type', 'text')
        .and('have.value', 'hello');
      cy.get('.tyk-masked-input__toggle').should('not.exist');
    });

    it('passes through readOnly to Input2 for non-password type', () => {
      cy.mount(
        <MaskedInput
          type="text"
          value="readonly value"
          readOnly
        />,
      );

      cy.get('input').should('not.exist');
      cy.get('.tyk-form-control--readonly').should('have.text', 'readonly value');
    });
  });

  describe('password type — editable', () => {
    it('renders with type password and a toggle button', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
        />,
      );

      cy.get('input').should('have.attr', 'type', 'password');
      cy.get('.tyk-masked-input__toggle').should('exist');
    });

    it('shows eye icon by default', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
        />,
      );

      cy.get('.tyk-masked-input__toggle')
        .should('have.attr', 'aria-label', 'Show password');
      cy.get('.tyk-masked-input__toggle .fa-eye').should('exist');
    });

    it('reveals the password when toggle is clicked', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
        />,
      );

      cy.get('.tyk-masked-input__toggle').click();

      cy.get('input').should('have.attr', 'type', 'text');
      cy.get('.tyk-masked-input__toggle')
        .should('have.attr', 'aria-label', 'Hide password');
      cy.get('.tyk-masked-input__toggle .fa-eye-slash').should('exist');
    });

    it('re-masks the password when toggle is clicked a second time', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
        />,
      );

      cy.get('.tyk-masked-input__toggle').click();
      cy.get('.tyk-masked-input__toggle').click();

      cy.get('input').should('have.attr', 'type', 'password');
      cy.get('.tyk-masked-input__toggle')
        .should('have.attr', 'aria-label', 'Show password');
    });

    it('disables the toggle when the input is disabled', () => {
      cy.mount(
        <MaskedInput
          type="password"
          disabled
        />,
      );

      cy.get('.tyk-masked-input__toggle').should('be.disabled');
      cy.get('input').should('be.disabled');
    });

    it('renders label, note and error via Input2', () => {
      cy.mount(
        <MaskedInput
          type="password"
          label="Password"
          note="Must be 8+ characters"
          error="Password is required"
        />,
      );

      cy.get('label').should('have.text', 'Password');
      cy.get('.tyk-form-control__help-block').should('have.text', 'Must be 8+ characters');
      cy.get('.tyk-form-control__error-message').should('have.text', 'Password is required');
      cy.get('.tyk-form-group').should('have.class', 'has-error');
    });

    it('calls onChange with the event and value when the user types', () => {
      const onChange = cy.stub().as('onChange');

      cy.mount(
        <MaskedInput
          type="password"
          onChange={onChange}
        />,
      );

      cy.get('input').type('abc');
      cy.get('@onChange').should('be.calledWith', Cypress.sinon.match.any, 'abc');
    });
  });

  describe('password type — readonly', () => {
    it('renders MaskSecret instead of an input', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret123"
          readOnly
        />,
      );

      cy.get('input').should('not.exist');
      cy.get('.tyk-mask-secret').should('exist');
      cy.get('.tyk-mask-secret__value').should('have.text', '•••••••••');
    });

    it('reveals the value when MaskSecret toggle is clicked', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret123"
          readOnly
        />,
      );

      cy.get('.tyk-mask-secret__toggle').click();
      cy.get('.tyk-mask-secret__value').should('have.text', 'secret123');
    });

    it('shows label in readonly password mode', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
          label="Password"
          readOnly
        />,
      );

      cy.get('label').should('have.text', 'Password');
      cy.get('.tyk-mask-secret').should('exist');
    });

    it('shows a dash when value is empty in readonly mode', () => {
      cy.mount(
        <MaskedInput
          type="password"
          readOnly
        />,
      );

      cy.get('.tyk-mask-secret__value').should('have.text', '-');
      cy.get('.tyk-mask-secret__toggle').should('not.exist');
    });

    it('applies tyk-form-group--label-has-width class when labelwidth is set in readonly mode', () => {
      cy.mount(
        <MaskedInput
          type="password"
          value="secret"
          label="Password"
          labelwidth="200px"
          readOnly
        />,
      );

      cy.get('.tyk-form-group').should('have.class', 'tyk-form-group--label-has-width');
      cy.get('label').should('have.css', 'flex-basis', '200px');
    });
  });
});
