import React from 'react';
import Input from './index';

describe('Input', () => {
  describe('general behaviour', () => {
    it('renders a basic text input', () => {
      cy.mount(
        <Input
          type="text"
          value="hello"
          theme="default rounded-corners"
        />,
      );

      cy.get('input')
        .should('exist')
        .and('have.attr', 'type', 'text')
        .and('have.value', 'hello');
    });

    it('renders the label', () => {
      cy.mount(
        <Input
          type="text"
          label="My label"
          id="my-input"
          theme="default rounded-corners"
        />,
      );

      cy.get('label')
        .should('have.text', 'My label')
        .and('have.attr', 'for', 'my-input');
    });

    it('displays the note', () => {
      cy.mount(
        <Input
          type="text"
          note="Helpful note"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__help-block')
        .should('have.text', 'Helpful note');
    });

    it('displays the error message and adds has-error class', () => {
      cy.mount(
        <Input
          type="text"
          error="Something went wrong"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-group')
        .should('have.class', 'has-error');
      cy.get('.tyk-form-control__error-message')
        .should('have.text', 'Something went wrong');
    });

    it('renders in readonly mode without an input', () => {
      cy.mount(
        <Input
          type="text"
          value="readonly value"
          readOnly
          theme="default rounded-corners"
        />,
      );

      cy.get('input').should('not.exist');
      cy.get('.tyk-form-control--readonly')
        .should('have.text', 'readonly value');
    });

    it('calls onChange when value changes', () => {
      const onChange = cy.stub().as('onChange');

      cy.mount(
        <Input
          type="text"
          onChange={onChange}
          theme="default rounded-corners"
        />,
      );

      cy.get('input').type('abc');
      cy.get('@onChange').should('have.been.called');
    });

    it('renders left and right addons', () => {
      cy.mount(
        <Input
          type="text"
          inputgroupaddonleft={<span>left</span>}
          inputgroupaddonright={<span>right</span>}
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-input-group').should('exist');
      cy.get('.tyk-input-group__addon').first().should('have.text', 'left');
      cy.get('.tyk-input-group__addon').last().should('have.text', 'right');
    });
  });

  describe('password type', () => {
    it('renders a password input with a toggle button', () => {
      cy.mount(
        <Input
          type="password"
          value="secret"
          theme="default rounded-corners"
        />,
      );

      cy.get('input')
        .should('have.attr', 'type', 'password');
      cy.get('.tyk-form-control__password-toggle')
        .should('exist');
    });

    it('shows an eye icon by default (password hidden)', () => {
      cy.mount(
        <Input
          type="password"
          value="secret"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__password-toggle')
        .should('have.attr', 'aria-label', 'Show password');
      cy.get('.tyk-form-control__password-toggle .fa-eye')
        .should('exist');
    });

    it('reveals the password when the toggle button is clicked', () => {
      cy.mount(
        <Input
          type="password"
          value="secret"
          theme="default rounded-corners"
        />,
      );

      cy.get('input').should('have.attr', 'type', 'password');

      cy.get('.tyk-form-control__password-toggle').click();

      cy.get('input').should('have.attr', 'type', 'text');
      cy.get('.tyk-form-control__password-toggle')
        .should('have.attr', 'aria-label', 'Hide password');
      cy.get('.tyk-form-control__password-toggle .fa-eye-slash')
        .should('exist');
    });

    it('hides the password again when the toggle button is clicked a second time', () => {
      cy.mount(
        <Input
          type="password"
          value="secret"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__password-toggle').click();
      cy.get('input').should('have.attr', 'type', 'text');

      cy.get('.tyk-form-control__password-toggle').click();
      cy.get('input').should('have.attr', 'type', 'password');
      cy.get('.tyk-form-control__password-toggle')
        .should('have.attr', 'aria-label', 'Show password');
    });

    it('wraps the password input in the password-wrapper div', () => {
      cy.mount(
        <Input
          type="password"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__password-wrapper')
        .should('exist')
        .find('input.tyk-form-control')
        .should('exist');
    });

    it('does not render a password toggle for non-password inputs', () => {
      cy.mount(
        <Input
          type="text"
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__password-wrapper').should('not.exist');
      cy.get('.tyk-form-control__password-toggle').should('not.exist');
    });

    it('disables the toggle button when the input is disabled', () => {
      cy.mount(
        <Input
          type="password"
          disabled
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-form-control__password-toggle')
        .should('be.disabled');
      cy.get('input')
        .should('be.disabled');
    });

    it('masks the password value in readonly mode', () => {
      cy.mount(
        <Input
          type="password"
          value="secret123"
          readOnly
          theme="default rounded-corners"
        />,
      );

      cy.get('input').should('not.exist');
      cy.get('.tyk-mask-secret').should('exist');
      cy.get('.tyk-mask-secret__value').should('have.text', '•••••••••');
      cy.get('.tyk-mask-secret__toggle')
        .should('have.attr', 'aria-label', 'Show secret');
    });

    it('reveals the password value in readonly mode when the toggle is clicked', () => {
      cy.mount(
        <Input
          type="password"
          value="secret123"
          readOnly
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-mask-secret__toggle').click();

      cy.get('.tyk-mask-secret__value').should('have.text', 'secret123');
      cy.get('.tyk-mask-secret__toggle')
        .should('have.attr', 'aria-label', 'Hide secret');
    });

    it('shows a dash in readonly mode when value is empty', () => {
      cy.mount(
        <Input
          type="password"
          readOnly
          theme="default rounded-corners"
        />,
      );

      cy.get('.tyk-mask-secret__value').should('have.text', '-');
      cy.get('.tyk-mask-secret__toggle').should('not.exist');
    });
  });
});
