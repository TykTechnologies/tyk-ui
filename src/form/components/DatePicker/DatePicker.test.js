import React from 'react';
import DatePicker from './index';

function Component(props) {
  // eslint-disable-next-line react/prop-types
  const { children, ...rest } = props;
  return (
    <DatePicker
      label="My Date"
      value={null}
      config={{
        dateFormat: 'Y-m-d',
      }}
      {...rest}
    >
      {children}
    </DatePicker>
  );
}

const classes = {
  error: 'has-error',
  labelWidth: 'tyk-form-group--label-has-width',
};

const selectors = {
  component: '.tyk-form-group',
  icon: '.fa-calendar',
  calendar: '.flatpickr-calendar',
  input: '.flatpickr-input',
  readonly: '.tyk-form-control--readonly',
  error: '.tyk-form-control__error-message',
  note: '.tyk-form-control__help-block',
  day: '.flatpickr-day',
};

describe('DatePicker', () => {
  it('renders an input by default and opens the calendar on focus', () => {
    cy.mount(<Component value={new Date()} />)
      .get(selectors.input)
      .should('exist')
      .focus()
      .get(selectors.calendar)
      .should('be.visible');
  });

  it('can open the calendar by clicking on the calendar icon', () => {
    cy.mount(<Component />)
      .get(selectors.icon)
      .click()
      .get(selectors.calendar)
      .should('be.visible');
  });

  it('can display a custom calendar trigger, like a button', () => {
    cy.mount(
      <Component>
        {({
          openCalendar,
          ref,
        }) => (
          <button ref={ref} id="datepicker-button" onClick={openCalendar} type="button">
            Open Calendar
          </button>
        )}
      </Component>,
    )
      .get('#datepicker-button')
      .click()
      .get(selectors.calendar)
      .should('be.visible');
  });

  it('the input can be in the disabled state', () => {
    cy.mount(<Component disabled />)
      .get(selectors.input)
      .should('have.attr', 'disabled');
  });

  it('in readOnly mode text is displayed, the value or "-" if no value', () => {
    cy.mount(<Component readOnly />)
      .get(selectors.input)
      .should('not.exist')
      .get(selectors.readonly)
      .should('exist')
      .and('have.text', '-');

    const value = '2042-08-27';
    cy.mount(<Component readOnly value={new Date(value)} />)
      .get(selectors.readonly)
      .should('exist')
      .and('have.text', value);
  });

  it('can render with error', () => {
    const error = 'my error';
    cy.mount(<Component error={error} />)
      .get(selectors.component)
      .should('have.class', classes.error)
      .get(selectors.error)
      .should('have.text', error);
  });

  it('can set a custom label', () => {
    const label = 'my label';
    cy.mount(<Component label={label} />)
      .get(selectors.component)
      .find('label')
      .should('have.text', label);
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
      .get(selectors.component)
      .should('have.class', classes.labelWidth)
      .find('label')
      .should('have.css', 'width', labelWidth);
  });

  it('can display a note', () => {
    const note = 'please read this';
    cy.mount(<Component label="my label" note={note} />)
      .get(selectors.note)
      .should('exist')
      .and('have.text', note);
  });

  it('calls the onOpen callback when the datepicker opens', () => {
    const onOpen = cy.stub().as('onOpen');
    cy.mount(<Component onOpen={onOpen} />)
      .get(selectors.input)
      .focus()
      .get('@onOpen')
      .should('be.called');
  });

  it('calls the onClose callback when the datepicker closes', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(
      <>
        <button id="close-button" type="button">close</button>
        <Component onClose={onClose} />
      </>,
    )
      .get(selectors.input)
      .focus()
      .get('#close-button')
      .click()
      .get('@onClose')
      .should('be.called');
  });

  it('calls the onChange callback when the value changes', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component onChange={onChange} />)
      .get(selectors.input)
      .focus()
      .get(selectors.day)
      .eq(10)
      .click()
      .get('@onChange')
      .should('be.called');
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

  it('can select a range of dates', () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const firstDay = 10;
    const secondDay = 12;
    cy.mount(<Component config={{ mode: 'range' }} value={[new Date(), new Date()]} onChange={() => {}} />)
      .get(selectors.icon)
      .click()
      .get(selectors.day)
      .contains(firstDay)
      .click()
      .get(selectors.day)
      .contains(secondDay)
      .click()
      .get(selectors.input)
      .should('have.value', `${year}-${month}-${firstDay} to ${year}-${month}-${secondDay}`);
  });

  it('the calendar can be displayed inline', () => {
    cy.mount(<Component config={{ inline: true }} />)
      .get(selectors.component)
      .find(selectors.calendar)
      .should('exist');
  });
});
