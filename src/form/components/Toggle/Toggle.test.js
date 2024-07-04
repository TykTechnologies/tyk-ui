import React, { useState } from 'react';
import Toggle from './index';

// eslint-disable-next-line react/prop-types
function Component({ children, ...rest }) {
  const [active, setActive] = useState('option1');
  return (
    <Toggle
      value={active}
      onChange={setActive}
      {...rest}
    >
      {children || (
        <Toggle.Item name="option1" />
      )}
    </Toggle>
  );
}

const classes = {
  disabled: 'tyk-toggle--disabled-true',
  labelWidth: 'tyk-form-group--label-has-width',
  separated: 'tyk-toggle__list--separated',
  onDark: 'tyk-toggle--on-dark',
  active: 'tyk-toggle__item--active',
};

const selectors = {
  component: '.tyk-toggle',
  list: '.tyk-toggle__list',
  error: '.tyk-form-control__error-message',
  note: '.tyk-form-control__help-block',
  item: '.tyk-toggle__item',
};

describe('Toggle', () => {
  it('renders the component', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist');
  });

  it('can use className and/or wrapperClassName to pass css classes to the component', () => {
    const className = 'my-class';
    const wrapperClassName = 'my-wrapper-class';
    cy.mount(<Component className={className} wrapperClassName={wrapperClassName} />)
      .get(selectors.component)
      .should('have.class', className)
      .and('have.class', wrapperClassName);
  });

  it('can be in the disabled state', () => {
    cy.mount(<Component disabled />)
      .get(selectors.component)
      .should('have.class', classes.disabled);
  });

  it('in readOnly mode, and type single the component shows Enabled or Disabled status', () => {
    cy.mount(<Component readOnly />)
      .get(selectors.component)
      .should('contain', 'Enabled');
  });

  it('can render with error', () => {
    const error = 'my error';
    cy.mount(<Component error={error} />)
      .get(selectors.error)
      .should('have.text', error);
  });

  it('can set a custom label', () => {
    const label = 'my label';
    cy.mount(<Component label={label} />)
      .get(selectors.component)
      .find('label')
      .should('contain', label);
  });

  it('can customize the label width', () => {
    const labelWidth = '100px';
    cy.mount(
      <>
        <style>
          {`${selectors.component} { display: flex; }`}
        </style>
        <Component label="my label" labelwidth={labelWidth} />
      </>,
    )
      .get(selectors.component)
      .find('label')
      .should('have.css', 'width', labelWidth);
  });

  it('can set a theme', () => {
    const theme = 'my-theme';
    cy.mount(<Component theme={theme} />)
      .get(selectors.component)
      .should('have.class', `tyk-toggle--${theme}`);
  });

  it('can have multiple items', () => {
    cy.mount(
      <Component type="multiple">
        <Toggle.Item
          label="short"
          name="option"
          value="option1"
        />
        <Toggle.Item
          label="medium"
          name="option"
          value="option2"
        />
      </Component>,
    )
      .get(selectors.item)
      .should('have.length', 2);
  });

  it('can specify a size', () => {
    const size = 'lg';
    cy.mount(<Component size={size} />)
      .get(selectors.component)
      .should('have.class', `tyk-toggle--${size}`);
  });

  it('items can be separated', () => {
    cy.mount(
      <Component type="multiple" separated>
        <Toggle.Item
          label="short"
          name="option"
          value="option1"
        />
        <Toggle.Item
          label="medium"
          name="option"
          value="option2"
        />
      </Component>,
    )
      .get(selectors.list)
      .should('have.class', classes.separated);
  });

  it('can specify a direction', () => {
    const direction = 'column';
    cy.mount(
      <Component type="multiple" separated direction={direction}>
        <Toggle.Item
          label="short"
          name="option"
          value="option1"
        />
        <Toggle.Item
          label="medium"
          name="option"
          value="option2"
        />
      </Component>,
    )
      .get(selectors.component)
      .should('have.class', `tyk-toggle--${direction}`);
  });

  it('can display on dark backgrounds', () => {
    cy.mount(<Component onDark />)
      .get(selectors.component)
      .should('have.class', classes.onDark);
  });

  it('calls the onChange callback when an item is clicked', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component onChange={onChange} />)
      .get(selectors.item)
      .click();

    cy.get('@onChange')
      .should('be.called');
  });

  it('an item can be selected/active', () => {
    cy.mount(
      <Component type="multiple" separated>
        <Toggle.Item
          label="short"
          name="option"
          value="option1"
        />
        <Toggle.Item
          label="medium"
          name="option"
          value="option2"
        />
      </Component>,
    )
      .get(selectors.item)
      .eq(1)
      .as('option2')
      .click();

    cy.get('@option2')
      .should('have.class', classes.active);
  });
});
