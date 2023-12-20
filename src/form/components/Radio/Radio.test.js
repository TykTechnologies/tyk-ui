import React from 'react';
import Radio from './index';

// eslint-disable-next-line react/prop-types
function Component(props) {
  return (
    <Radio {...props} />
  );
}

const classes = {
  disabled: 'tyk-radio--is-disabled',
  noMargin: 'no-margin',
};

const selectors = {
  component: '.tyk-radio',
  componentInline: '.tyk-radio--inline',
  label: '.tyk-radio > label',
  option: 'option',
  readonly: '.tyk-form-control--readonly',
  error: '.tyk-form-control__error-message',
  note: '.tyk-form-control__help-block',
  input: '.tyk-radio input',
};

describe('Radio', () => {
  it('renders the component', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist');
  });

  it('can set theme classes', () => {
    const theme1 = 'theme1';
    const theme2 = 'theme2';
    cy.mount(<Component theme={`${theme1} ${theme2}`} />)
      .get(selectors.component)
      .should('have.class', `tyk-radio--theme-${theme1}`)
      .and('have.class', `tyk-radio--theme-${theme2}`);
  });

  it('can have a custom css class', () => {
    const wrapperClassName = 'datepicker-1';
    cy.mount(<Component wrapperClassName={wrapperClassName} />)
      .get(selectors.component)
      .should('have.class', wrapperClassName);
  });

  it('can render with a label', () => {
    const label = 'my label';
    cy.mount(<Component label={label} />)
      .get(selectors.label)
      .should('exist')
      .and('have.text', label);
  });

  it('can display a note', () => {
    const note = 'please read this';
    cy.mount(<Component label="my label" note={note} />)
      .get(selectors.note)
      .should('exist')
      .and('have.text', note);
  });

  it('the input can be in the disabled state', () => {
    cy.mount(<Component disabled />)
      .get(selectors.input)
      .should('have.attr', 'disabled');
  });

  it('in readOnly mode the input is in the disabled state', () => {
    cy.mount(<Component readOnly />)
      .get(selectors.component)
      .should('have.class', classes.disabled)
      .get(selectors.input)
      .should('have.attr', 'disabled');
  });

  it('can remove margins with the "nospace" prop', () => {
    cy.mount(<Component nospace />)
      .get(selectors.component)
      .should('have.class', classes.noMargin);
  });

  it('can be displayed inline', () => {
    cy.mount(<Component inline />)
      .get(selectors.componentInline)
      .should('exist');
  });
});
