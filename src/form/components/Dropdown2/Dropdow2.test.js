import React from 'react';
import Dropdown2 from './index';

describe('Dropdown2', () => {
  const classes = {
    buttonGroup: '.tyk-button-group',
    dropdownTrigger: '.dropdown__trigger',
    btn: '.tyk-button',
    arrowIcon: '.tykon-arrowdown',
    dropdownListWrapper: '.tyk-list',
  };
  it('renders by default a button with an arrow', () => {
    cy.mount(<Dropdown2 />)
      .get(classes.dropdownTrigger)
      .should('exist')
      .get(classes.btn)
      .should('exist')
      .get(classes.arrowIcon)
      .should('exist');
  });

  it('customizes the button trigger name', () => {
    cy.mount(<Dropdown2 title="Custom name" />)
      .get(classes.dropdownTrigger)
      .should('contain', 'Custom name');
  });

  it('can adjust the theme of the trigger button', () => {
    cy.mount(<Dropdown2 title="Dropdown" theme="default" />)
      .get(classes.dropdownTrigger)
      .should('have.class', 'tyk-button--default');
  });

  it('opens the dropdown when the trigger button is clicked', () => {
    cy.mount(
      <Dropdown2 title="Dropdown" theme="primary">
        Content of dropdown
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .get('.dropdown__menu')
      .should('not.exist')
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('exist');
  });

  it('closes the dropdown when the trigger button is clicked again', () => {
    cy.mount(
      <Dropdown2 title="Dropdown" theme="primary">
        Content of dropdown
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('exist')
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('not.exist');
  });

  it('closes the dropdown when the user clicks outside the dropdown', () => {
    cy.mount(
      <Dropdown2 title="Dropdown" splitTrigger theme="primary">
        Content of dropdown
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('exist')
      .get('body')
      .click()
      .get('.dropdown__menu')
      .should('not.exist');
  });

  it('closes the dropdown when the splitTrigger is true, and the button next to the arrow is clicked', () => {
    cy.mount(
      <Dropdown2 title="Dropdown" splitTrigger theme="primary">
        Content of dropdown
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('exist')
      .get(`${classes.buttonGroup} ${classes.btn}`)
      .first()
      .click()
      .get('.dropdown__menu')
      .should('not.exist');
  });

  it('can split the trigger button, into a button and an arrow', () => {
    cy.mount(
      <Dropdown2 title="Dropdown" splitTrigger theme="primary">
        Content of dropdown
      </Dropdown2>,
    )
      .get(classes.buttonGroup)
      .should('exist')
      .get(classes.btn)
      .should('have.length', 2);
  });

  it('displays dropdown items when the trigger button is clicked', () => {
    cy.mount(
      <div
        style={{
          marginLeft: '40%',
        }}
      >
        <Dropdown2 splitTrigger title="Dropdown" theme="primary">
          <Dropdown2.Item>Item 1</Dropdown2.Item>
          <Dropdown2.Item>Item 2</Dropdown2.Item>
        </Dropdown2>
      </div>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu')
      .should('exist')
      .get(classes.dropdownListWrapper)
      .should('exist')
      .get(`${classes.dropdownListWrapper} > li`)
      .should('have.length', 2);
  });

  it('calls the onChange method of the Dropdown, with the value of the clicked item', () => {
    const onChange = cy.stub();
    cy.mount(
      <div
        style={{
          marginLeft: '40%',
        }}
      >
        <Dropdown2 splitTrigger title="Dropdown" theme="primary" onChange={onChange}>
          <Dropdown2.Item value="1">Item 1</Dropdown2.Item>
          <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
        </Dropdown2>
      </div>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get(`${classes.dropdownListWrapper} > li`)
      .first()
      .click()
      .then(() => {
        expect(onChange).to.be.calledOnce;
        expect(onChange).to.be.calledWith('1');
      });
  });

  it.only('selects the dropdown item, based on the value property', () => {
    cy.mount(
      <Dropdown2 value="1" splitTrigger title="Dropdown" theme="primary">
        <Dropdown2.Item value="1">Item 1 Item 1 Item 1 Item 1 Item 1 Item 1</Dropdown2.Item>
        <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get(`${classes.dropdownListWrapper} > li`)
      .first()
      .should('have.class', 'tyk-list__item--selected');
  });

  it('displays selected value in the dropdown trigger, if setSelectedValueAsTitle is true', () => {
    cy.mount(
      <Dropdown2 theme="success" value="1" title="Dropdown" setSelectedValueAsTitle>
        <Dropdown2.Item value="1">Item 1</Dropdown2.Item>
        <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
      </Dropdown2>,
    )
      .get(classes.dropdownTrigger)
      .should('contain', '1');
  });

  it('sets a max-width to the dropdown list', () => {
    cy.mount(
      <div
        style={{
          marginLeft: '40%',
        }}
      >
        <Dropdown2 maxWidth="200px" theme="success" value="1" title="Dropdown" setSelectedValueAsTitle>
          <Dropdown2.Item value="1">Item 1</Dropdown2.Item>
          <Dropdown2.Item value="2">Item 2</Dropdown2.Item>
        </Dropdown2>
      </div>,
    )
      .get(classes.dropdownTrigger)
      .click()
      .get('.dropdown__menu .tyk-list')
      .should('have.css', 'max-width', '200px');
  });

  it('calls the onTriggerClick function when the trigger button is clicked in case of splitTrigger is set to true', () => {
    const onTriggerClick = cy.stub();
    cy.mount(
      <Dropdown2
        splitTrigger
        title="Dropdown"
        theme="success"
        onTriggerClick={onTriggerClick}
        value="1"
      >
        Content of dropdown
      </Dropdown2>,
    )
      .get(`${classes.buttonGroup} ${classes.btn}`)
      .first()
      .click()
      .then(() => {
        expect(onTriggerClick).to.be.calledOnce;
        expect(onTriggerClick).to.be.calledWith('1');
      });
  });
});
