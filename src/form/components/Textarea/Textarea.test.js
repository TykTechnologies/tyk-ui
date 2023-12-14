import React from 'react';
import Textarea from './index';

// eslint-disable-next-line react/prop-types
function Component({ children, ...rest }) {
  return (
    <Textarea {...rest}>
      {children}
    </Textarea>
  );
}

const classes = {
  error: 'has-error',
};

const selectors = {
  component: '.tyk-form-group',
  label: '.tyk-form-group > label',
  readonly: '.tyk-form-control--readonly',
  error: '.tyk-form-control__error-message',
  note: '.tyk-form-control__help-block',
  textarea: '.tyk-form-group textarea',
};

describe('Textarea', () => {
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
      .should('have.class', `tyk-form-group--${theme1}`)
      .and('have.class', `tyk-form-group--${theme2}`);
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

  it('can customize the label width', () => {
    const labelWidth = '100px';
    cy.mount(
      <>
        <style>
          {'.tyk-form-group { display: flex; }'}
        </style>
        <Component label="my label" labelwidth={labelWidth} />
      </>,
    )
      .get(selectors.label)
      .should('have.css', 'width', labelWidth);
  });

  it('can render with error', () => {
    const error = 'my error';
    cy.mount(<Component error={error} />)
      .get(selectors.component)
      .should('have.class', classes.error)
      .get(selectors.error)
      .should('have.text', error);
  });

  it('can display a note', () => {
    const note = 'please read this';
    cy.mount(<Component label="my label" note={note} />)
      .get(selectors.note)
      .should('exist')
      .and('have.text', note);
  });

  it('in readOnly mode text is displayed, the value or "-" if no value', () => {
    cy.mount(<Component readOnly />)
      .get(selectors.input)
      .should('not.exist')
      .get(selectors.readonly)
      .should('exist')
      .and('have.text', '-');

    const value = 'my value';
    cy.mount(<Component readOnly value={value} />)
      .get(selectors.readonly)
      .should('exist')
      .and('have.text', value);
  });

  it('calls the onChange callback when the value changes', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component onChange={onChange} />)
      .get(selectors.textarea)
      .type('something');
    cy.get('@onChange')
      .should('be.called');
  });

  it('the input can be in the disabled state', () => {
    cy.mount(<Component disabled />)
      .get(selectors.textarea)
      .should('have.attr', 'disabled');
  });

  it('can pass additional attributes to the textarea element using the "input" prop', () => {
    cy.mount(<Component input={{ 'data-custom-attribute': 'foo' }} />)
      .get(selectors.textarea)
      .should('have.attr', 'data-custom-attribute', 'foo');
  });
});
