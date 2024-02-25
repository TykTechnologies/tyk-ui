import React from 'react';
import Dropdown from './index';

// eslint-disable-next-line react/prop-types
function Component({ children, ...rest }) {
  return (
    <Dropdown btnTitle="Dropdown" {...rest}>
      {children || (
        <>
          <Dropdown.Item eventKey="item1" title="Item 1" />
          <Dropdown.Item eventKey="item2" title="Item 2" />
          <Dropdown.Item eventKey="item3" title="Item 3" />
        </>
      )}
    </Dropdown>
  );
}

const classes = {
  btnGroup: 'tyk-button-group',
  displayBlock: 'tyk-dropdown--block',
  custom: 'tyk-dropdown--custom',
  relative: 'tyk-dropdown--relative',
  scrollable: 'tyk-dropdown--scrollable',
};

const selectors = {
  component: '.tyk-dropdown',
  menu: '.tyk-dropdown-menu',
  trigger: '.tyk-dropdown__trigger',
  label: '.tyk-dropdown label',
  item: '.tyk-dropdown-menu li',
  checkIcon: '.fa-check',
};

describe('Dropdown', () => {
  it('renders the component with a trigger that opens the dropdown menu', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist')
      .get(selectors.menu)
      .should('not.exist')
      .get(selectors.trigger)
      .click();

    cy.get(selectors.menu)
      .should('exist');
  });

  it('can render with a label', () => {
    const label = 'my label';
    cy.mount(<Component label={label} />)
      .get(selectors.label)
      .should('exist')
      .and('have.text', label);
  });

  it('the menu can be appended to a specific element', () => {
    cy.mount(
      <div>
        <div id="target-container">target</div>
        <Component appendTo="#target-container" />
      </div>,
    );

    cy.get(selectors.trigger)
      .click();

    cy.get('#target-container')
      .find(selectors.menu)
      .should('exist');
  });

  it('can change behaviour to close the menu on item select', () => {
    cy.mount(<Component open closeOnSelect />)
      .get(selectors.item)
      .eq(0)
      .click();

    cy.get(selectors.menu)
      .should('not.exist');
  });

  it('can not render the trigger', () => {
    cy.mount(<Component showTriggerButton={false} />)
      .get(selectors.component)
      .should('exist')
      .get(selectors.trigger)
      .should('not.exist');
  });

  it('can specify a custom class for the trigger', () => {
    const className = 'my-class';
    cy.mount(<Component btnClassName={className} />)
      .get(selectors.trigger)
      .should('have.class', className);
  });

  it('the trigger can be a button group', () => {
    cy.mount(<Component btnGroup />)
      .get(selectors.component)
      .should('have.class', classes.btnGroup);
  });

  it('can specify a theme for the component', () => {
    const theme = 'primary';
    cy.mount(<Component btnTheme={theme} />)
      .get(selectors.component)
      .should('have.class', `theme-${theme}`);
  });

  it('can have a custom button title', () => {
    const title = 'my title';
    cy.mount(<Component customBtnTitle={title} />)
      .get(selectors.trigger)
      .should('have.text', title);
  });

  it('can use className and/or wrapperClassName to pass css classes to the component', () => {
    const className = 'my-class';
    const wrapperClassName = 'my-wrapper-class';
    cy.mount(<Component className={className} wrapperClassName={wrapperClassName} />)
      .get(selectors.component)
      .should('have.class', className)
      .and('have.class', wrapperClassName);
  });

  it('adds the displayBlock class on the menu regardless of the value of the display prop', () => {
    cy.mount(<Component open display="random" />)
      .get(selectors.menu)
      .should('have.class', classes.displayBlock);
  });

  it('the trigger button can be disabled', () => {
    cy.mount(<Component disabled />)
      .get(selectors.trigger)
      .click({ force: true });

    cy.get(selectors.menu)
      .should('not.exist');
  });

  it('adds the custom content class if hasCustomContent is true', () => {
    cy.mount(<Component open hasCustomContent />)
      .get(selectors.menu)
      .should('have.class', classes.custom);
  });

  it('can use listclassnames to pass css classes to the menu', () => {
    const className = 'my-class';
    cy.mount(<Component open listclassnames={className} />)
      .get(selectors.menu)
      .should('have.class', className);
  });

  it('calls the onClose callback when the dropdown has closed', () => {
    const onClose = cy.stub().as('onClose');
    cy.mount(<Component onClose={onClose} />)
      .get(selectors.trigger)
      .click();

    cy.get('body')
      .click();

    cy.get('@onClose')
      .should('be.called');
  });

  it('calls the onSelect callback when an item is selected', () => {
    const onSelect = cy.stub().as('onSelect');
    cy.mount(<Component onSelect={onSelect} />)
      .get(selectors.trigger)
      .click();

    cy.get(selectors.item)
      .eq(0)
      .click();

    cy.get('@onSelect')
      .should('be.called');
  });

  it('can set the initial opened state', () => {
    cy.mount(<Component open />)
      .get(selectors.menu)
      .should('be.visible');
  });

  it('can specify the offset position', () => {
    cy.mount(<Component open offset={{ top: 0, left: 0 }} />)
      .get(selectors.menu)
      .should('have.css', 'top', '0px')
      .and('have.css', 'left', '0px');
  });

  it('adds the relative class if position is "relative"', () => {
    cy.mount(<Component open position="relative" />)
      .get(selectors.menu)
      .should('have.class', classes.relative);
  });

  it('selects the item with the key specified by selectedItem', () => {
    cy.mount(<Component open selectedItem="item2" />)
      .get(selectors.item)
      .eq(1)
      .find(selectors.checkIcon)
      .should('exist');
  });

  it('can specify to not show the check icon when selected', () => {
    cy.mount(<Component open selectedItem="item2" showCheckmark={false} />)
      .get(selectors.item)
      .eq(1)
      .find(selectors.checkIcon)
      .should('not.exist');
  });

  it('can prevent the trigger label to change on item select', () => {
    const label = 'my-label';
    cy.mount(<Component open btnTitle={label} stopButtonTextChange />)
      .get(selectors.trigger)
      .should('have.text', label)
      .get(selectors.item)
      .eq(0)
      .click();

    cy.get(selectors.trigger)
      .should('have.text', label);
  });

  it('adds the scrollable class if maxHeight is set', () => {
    cy.mount(<Component open maxHeight="100px" />)
      .get(selectors.menu)
      .should('have.class', classes.scrollable);
  });

  it('items can have an onClick callback that is called when the item is clicked', () => {
    const onClick = cy.stub().as('onClick');
    const itemId = 'item1';
    cy.mount(
      <Component open>
        <Dropdown.Item eventKey={itemId} title="Item 1" onClick={onClick} />
      </Component>,
    )
      .get(selectors.item)
      .eq(0)
      .click();

    cy.get('@onClick')
      .should('be.calledWith', itemId);
  });

  it('items can be custom content', () => {
    const text = 'my item';
    cy.mount(
      <Component open>
        <Dropdown.Item customdropdownitem={<div>{text}</div>} />
      </Component>,
    )
      .get(selectors.item)
      .eq(0)
      .should('have.text', text);
  });
});
