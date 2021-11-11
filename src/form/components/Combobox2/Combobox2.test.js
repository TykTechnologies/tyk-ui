import React, { useState } from 'react';
import { mount } from '@cypress/react';
import '../../../index.scss';
import Combobox2 from './index';

describe('Combobox2', () => {
  const items = [
    { id: 'item1', name: 'Item1' },
    { id: 'item2', name: 'Item2' },
    { id: 'item3', name: 'Item3' },
    { id: 'item4', name: 'Item4' },
    { id: 'item5', name: 'Item5' },
  ];
  const comboboxLabel = 'Combobox label';
  const classes = {
    component: 'tyk-combobox2',
    valueContainer: 'tyk-combobox2__current-values',
    textValue: 'tyk-combobox2__text-value',
    trigger: 'tyk-combobox2__values-container-trigger',
    dropdown: 'tyk-combobox2__combobox-dropdown',
    dropdownList: 'tyk-combobox2__combobox-list',
    note: 'tyk-form-control__help-block',
    error: 'tyk-form-control__error-message',
    entryField: 'tyk-combobox2__entry-field',
    tag: 'tyk-pill',
    searchField: 'tyk-combobox2__combobox-search',
    checkIcon: 'fa-check',
  };

  it('renders the basics: value, values (selectable items), label, label width, placeholder, note, error, themes', () => {
    const selectedItem = items.find(({ id }) => id === 'item2');
    const placeholder = 'combobox placeholder';
    const note = 'Something to be aware of';
    const error = 'Something went wrong';
    const labelWidth = '200px';

    mount(
      <Combobox2
        values={items}
        value={selectedItem.id}
        placeholder={placeholder}
        label={comboboxLabel}
        labelwidth={labelWidth}
        note={note}
        error={error}
        theme="default inline rounded-corners"
      />,
    );

    cy.get(`.${classes.component}`)
      .should('have.class', 'tyk-form-group--default')
      .and('have.class', 'tyk-form-group--inline')
      .and('have.class', 'tyk-form-group--rounded-corners')
      .and('have.class', 'has-error');

    cy.get(`.${classes.textValue}`)
      .should('have.text', selectedItem.name);

    cy.get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.dropdownList} li`)
      .should('have.length', items.length)
      .contains(selectedItem.name)
      .find(`.${classes.checkIcon}`);

    cy.get('label')
      .should('have.text', comboboxLabel)
      .and('have.css', 'width', labelWidth);

    cy.get(`.${classes.note}`)
      .should('have.text', note);
    cy.get(`.${classes.error}`)
      .should('have.text', error);

    cy.get(`.${classes.dropdownList} li`)
      .eq(1)
      .click()
      .get(`.${classes.textValue}`)
      .should('have.class', 'is-placeholder')
      .and('have.text', placeholder);
  });

  it('the value can be a string, an object with an id property, or an array of strings or objects', () => {
    const values = [
      'item1',
      { id: 'item2' },
      ['item3'],
      [{ id: 'item4' }],
    ];
    const getItemNameById = id => items.find(i => i.id === id).name;

    const Comp = () => {
      const [index, setIndex] = useState(0);
      return (
        <>
          <button type="button" onClick={() => setIndex(index + 1)}>change value</button>
          <Combobox2
            values={items}
            value={values[index]}
            theme="default rounded-corners"
          />
        </>
      );
    };
    mount(<Comp />);

    const changeValueAndCheck = id => cy
      .contains('change value')
      .click()
      .get(`.${classes.textValue}`)
      .should('have.text', getItemNameById(id));

    cy.get(`.${classes.textValue}`)
      .should('have.text', getItemNameById(values[0]))

      .then(() => changeValueAndCheck(values[1].id))
      .then(() => changeValueAndCheck(values[2][0]))
      .then(() => changeValueAndCheck(values[3][0].id));
  });

  it('valueOverflow controls the display of the values on single or multiple lines', () => {
    const singleHeight = 32;
    const Comp = () => {
      const [valueOverflow, setValueOverflow] = useState('multiple');
      return (
        <div style={{ width: '200px' }}>
          <label>
            <input id="single-checkbox" type="checkbox" onChange={e => setValueOverflow(e.target.checked ? 'single' : 'multiple')} />
            <span>Single</span>
          </label>
          <Combobox2
            values={items}
            value={['item1', 'item2', 'item3', 'item4', 'item5']}
            valueOverflow={valueOverflow}
            theme="default rounded-corners"
          />
        </div>
      );
    };
    mount(<Comp />);

    cy.get(`.${classes.textValue}`)
      .invoke('css', 'height').then(parseFloat)
      .should('be.gt', singleHeight)

      .get('#single-checkbox')
      .check()
      .get(`.${classes.textValue}`)
      .invoke('css', 'height')
      .then(parseFloat)
      .should('eq', singleHeight);
  });

  it('can render tags', () => {
    mount(
      <Combobox2
        values={items}
        value={[]}
        tags
        tagSeparators={[' ', '.']}
        addTagOnBlur
        theme="default rounded-corners"
      />,
    );

    cy.get(`.${classes.entryField}`)
      .type('aaa')
      .blur()
      .get('.tyk-pill:last-of-type')
      .should('have.text', 'aaa')

      .get(`.${classes.entryField}`)
      .type('bbb.')
      .get('.tyk-pill')
      .should('have.length', 2)
      .filter(':last-of-type')
      .should('have.text', 'bbb');
  });

  it('respects the disabled state', () => {
    mount(
      <Combobox2
        values={items}
        value="item1"
        theme="default rounded-corners"
        disabled
      />,
    );

    cy.get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.dropdownList}`)
      .should('not.exist');
  });

  it('only renders text in readonly mode', () => {
    mount(
      <Combobox2
        values={items}
        value="item1"
        readOnly
      />,
    );

    cy.get(`.${classes.component}`)
      .should('have.text', 'Item1');

    cy.get('.tyk-form-control__wrapper')
      .should('not.exist');
  });

  it('can accept only values that exist in the list', () => {
    mount(
      <Combobox2
        values={items}
        value="item1"
        tags
        allowCustomValues={false}
      />,
    );

    cy.get(`.${classes.tag}`)
      .should('have.length', 1)

      .get(`.${classes.entryField}`)
      .type('nonexistent{enter}')
      .get(`.${classes.tag}`)
      .should('have.length', 1)

      .get(`.${classes.entryField}`)
      .type('Item2{enter}')
      .get(`.${classes.tag}`)
      .should('have.length', 2);
  });

  it('can display a search input in the list and filter items by a custom function', () => {
    mount(
      <Combobox2
        values={items}
        value="item1"
        showSearch
        searchItem={(item, searchValue) => {
          if (!searchValue) return true;
          return Number(item.name.substr(-1)) + Number(searchValue) === 6;
        }}
      />,
    );

    cy.get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.dropdownList} li`)
      .should('have.length', items.length)

      .get(`.${classes.searchField} input`)
      .type('2')
      .get(`.${classes.dropdownList} li`)
      .should('have.length', 1)
      .and('have.text', 'Item4');
  });

  it('can use custom components to display a value of the component or an item in the dropdown list', () => {
    mount(
      <Combobox2
        values={items}
        value={['item1', 'item3']}
        multiple
        renderValue={v => <span className="custom-value">{v.name}</span>}
        renderListItem={i => <span className="custom-item">{i.name}</span>}
      />,
    );

    cy.get(`.${classes.valueContainer} .${classes.textValue}`)
      .should('not.exist');
    cy.get(`.${classes.valueContainer} .custom-value`)
      .should('have.length', 2);

    cy.get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.dropdownList} li`)
      .should('not.exist')
      .get(`.${classes.dropdownList} .custom-item`)
      .should('have.length', items.length);
  });

  it('can render a custom component in place of the entire content of the dropdown', () => {
    mount(
      <Combobox2
        values={items}
        value={['item1', 'item3']}
        multiple
        renderList={values => (
          <div className="custom-list">
            {values.map(item => (
              <span key={item.id} className="custom-item">{item.name}</span>
            ))}
          </div>
        )}
      />,
    );

    cy.get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.dropdown} .${classes.dropdownList}`)
      .should('not.exist')
      .get(`.${classes.dropdown} .custom-list`)
      .should('exist')
      .find('.custom-item')
      .should('have.length', items.length);
  });

  it('in expand mode when clicking on the dropdown trigger the value container expands instead of displaying the dropdown', () => {
    const normalHeight = 38;
    const Comp = () => (
      <div style={{ width: '300px' }}>
        <Combobox2
          values={items}
          value={['item1', 'item2', 'item3', 'item4', 'item5']}
          tags
          expandMode
        />
      </div>
    );
    mount(<Comp />);

    cy.get(`.${classes.valueContainer}`)
      .invoke('css', 'height')
      .then(parseFloat)
      .should('eq', normalHeight)

      .get(`.${classes.trigger}`)
      .click()
      .get(`.${classes.valueContainer}`)
      .invoke('css', 'height')
      .then(parseFloat)
      .should('be.gt', normalHeight);
  });

  it('the dropdown trigger can be displayed or not', () => {
    const Comp = () => {
      const [displayTrigger, setDisplayTrigger] = useState(true);
      return (
        <>
          <label>
            <input
              id="display-trigger"
              type="checkbox"
              checked={displayTrigger}
              onChange={e => setDisplayTrigger(e.target.checked)}
            />
            <span>display trigger</span>
          </label>
          <Combobox2
            values={items}
            value="item1"
            displayDropdownTrigger={displayTrigger}
          />
        </>
      );
    };
    mount(<Comp />);

    cy.get(`.${classes.trigger}`)
      .should('exist')

      .get('#display-trigger')
      .uncheck()
      .get(`.${classes.trigger}`)
      .should('not.exist');
  });

  it('handles keyboard navigation in the list', () => {
    mount(
      <Combobox2
        values={items}
        value=""
        tags
      />,
    );

    cy.get(`.${classes.tag}`)
      .should('have.length', 0)
      .get(`.${classes.entryField}`)
      .focus()
      .get('li.active')
      .should('not.exist')

      .get(`.${classes.entryField}`)
      .type('{downarrow}')
      .get('li:first')
      .should('have.class', 'active')

      .get(`.${classes.entryField}`)
      .type('{uparrow}')
      .get('li:first')
      .should('not.have.class', 'active')
      .get('li:last')
      .should('have.class', 'active')

      .get(`.${classes.entryField}`)
      .type('{enter}')
      .get(`.${classes.tag}`)
      .should('have.length', 1)
      .and('have.text', items[items.length - 1].name)

      .get(`.${classes.entryField}`)
      .type('{esc}')
      .get('.tyk-combobox2__combobox-dropdown')
      .should('not.exist');
  });

  it('can display a "select all" item in the dropdown', () => {
    mount(
      <Combobox2
        values={items}
        value=""
        tags
        selectAll
      />,
    );

    const getSelectAll = () => cy
      .get(`.${classes.dropdownList}`)
      .contains('Select All');

    const clickItem2 = () => cy
      .get(`.${classes.dropdownList} li:nth-child(2)`)
      .click();

    cy.get(`.${classes.tag}`)
      .should('have.length', 0)

      .get(`.${classes.entryField}`)
      .focus()

      .then(getSelectAll)
      .click()
      .find(`.${classes.checkIcon}`)
      .should('exist')
      .get(`.${classes.tag}`)
      .should('have.length', items.length)

      .then(clickItem2)
      .then(getSelectAll)
      .find(`.${classes.checkIcon}`)
      .should('not.exist')
      .get(`.${classes.tag}`)
      .should('have.length', items.length - 1)

      .then(clickItem2)
      .then(getSelectAll)
      .find(`.${classes.checkIcon}`)
      .should('exist')
      .get(`.${classes.tag}`)
      .should('have.length', items.length)

      .then(getSelectAll)
      .click()
      .get(`.${classes.tag}`)
      .should('have.length', 0);
  });
});
