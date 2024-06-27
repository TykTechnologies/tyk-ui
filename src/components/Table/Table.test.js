import React from 'react';
import Table from './index'; // Replace with the actual path to your Table component
import Checkbox from '../../form/components/Checkbox';

describe('Table Component Rendering', () => {
  const selectors = {
    table: '.tyk-table',
    headerCell: '.tyk-table thead th',
    sortIcon: '.tyk-table thead th .fa-sort',
    sortIconClassName: '.fa-sort',
    selectAllCheckbox: '.tyk-table thead input[type="checkbox"]',
    allRowCheckboxes: '.tyk-table tbody input[type="checkbox"]',
    row: '.tyk-table tbody tr',
    noDataMessage: '.tyk-message',
    loadingIndicator: '.tyk-loading__wrapper',
    infiniteScroll: '.scrollable',
    pagination: '.tyk-pagination',
    columnHeader: '.tyk-table thead th',
    sortedColumn: '.sorted',
    cell: '.tyk-table tbody td',
    checkbox: 'input[type="checkbox"]',
  };
  const configWithInfiniteScroll = {
    columns: [
      { id: 'name', name: 'Policy Name', type: 'string' },
      { id: 'access_rights', name: 'Access Rights', type: 'string' },
      { id: 'auth_type', name: 'Auth Type', type: 'string' },
    ],
    rows: [
      {
        values: {
          name: { value: 'Policy 1' },
          access_rights: { value: 'Access 1' },
          auth_type: { value: 'Auth Type 1' },
        },
      },
      {
        values: {
          name: { value: 'Policy 1' },
          access_rights: { value: 'Access 1' },
          auth_type: { value: 'Auth Type 1' },
        },
      },
      {
        values: {
          name: { value: 'Policy 1' },
          access_rights: { value: 'Access 1' },
          auth_type: { value: 'Auth Type 1' },
        },
      },
    ],
    pagination: {
      totalPages: 2,
      perPage: 1,
      current: 1,
    },
  };
  const configWithNoData = {
    columns: [
      { id: 'name', name: 'Policy Name', type: 'string' },
      { id: 'access_rights', name: 'Access Rights', type: 'string' },
      { id: 'auth_type', name: 'Auth Type', type: 'string' },
    ],
    rows: [],
  };
  const configSelectable = {
    selectable: {
      position: 'LEFT',
      type: Checkbox,
      style: 'dummy-style',
      allowSelectAll: true,
    },
  };
  const config = {
    columns: [
      {
        id: 'name', name: 'Policy Name', type: 'string', sortable: { default: 'DESC' },
      },
      { id: 'access_rights', name: 'Access Rights', type: 'string' },
      {
        id: 'auth_type', name: 'Auth Type', type: 'string', sortable: true,
      },
      {
        id: 'date', name: 'Date Created', type: 'string', sortable: true,
      },
    ],
    rows: [
      {
        values: {
          name: { value: 'Policy 1' },
          access_rights: { value: 'Full Access' },
          auth_type: { value: 'Token' },
          date: { value: '01/01/2022' },
        },
        selected: false,
        events: {
          onClick: (value) => console.log(value),
        },
        styling: {
          className: 'row-class-1',
        },
      },
      {
        values: {
          name: { value: 'Policy 2' },
          access_rights: { value: 'Read Only' },
          auth_type: { value: 'OAuth' },
          date: { value: '02/01/2022' },
        },
        selected: false,
        events: {
          onClick: () => console.log('Row 2 Clicked'),
        },
        styling: {
          className: 'row-class-2',
        },
      },
    ],
    pagination: {
      totalPages: 10,
      perPage: 5,
      current: 1,
    },
    maxHeight: '500px',
    styling: {
      className: 'tyk-table__wrapper no-innner-horizontal-borders',
    },
  };

  it('renders the table component correctly', () => {
    cy
      .mount(<Table value={config} />)
      .get(selectors.table).should('exist');
  });

  it('should render all column headers as per the configuration', () => {
    // because it's selectable, we have an extra column
    cy
      .mount(
        <Table
          value={{
            ...config,
            ...configSelectable,
          }}
        />,
      )
      .get(selectors.headerCell).should('have.length', config.columns.length + 1);

    config.columns.forEach((column) => {
      cy.get(selectors.headerCell)
        .contains(column.name)
        .should('exist');
    });
  });

  it('should display a row with checkboxes if the table is set as selectable', () => {
    cy
      .mount(
        <Table
          value={{
            ...config,
            ...configSelectable,
          }}
        />,
      )
      .get(selectors.allRowCheckboxes)
      .should('have.length', config.rows.length);
  });

  it('should render rows with correct data', () => {
    cy
      .mount(<Table value={config} />)
      .get(selectors.row).should('have.length', config.rows.length);

    config.rows.forEach((row, rowIndex) => {
      const { values } = row;
      cy.get(selectors.row).eq(rowIndex).within(() => {
        Object.keys(values).forEach((columnId, index) => {
          cy.get(`td:nth(${index})`).should('have.text', values[columnId].value);
        });
      });
    });
  });

  it('should render "No Data Available" message when there are no rows', () => {
    cy
      .mount(<Table value={configWithNoData} />)
      .get(selectors.noDataMessage).should('exist').should('contain', 'No Data Available');
  });

  it('should not render any rows when there are no rows in the configuration', () => {
    cy
      .mount(<Table value={configWithNoData} />)
      .get(selectors.table).should('not.exist');
  });

  it('should render a loading indicator when loading is true', () => {
    cy
      .mount(<Table value={config} loading />)
      .get(selectors.loadingIndicator).should('exist');
  });

  it('should render the table with infinite scrolling enabled', () => {
    cy.mount(<Table value={configWithInfiniteScroll} infiniteScrolling />);
    cy.get(selectors.table).should('exist');
    cy.get(selectors.pagination).should('not.exist');
    cy.get(selectors.infiniteScroll).should('exist');
  });

  it('should render sortable columns with column headers', () => {
    cy.mount(<Table value={config} />)
      .get(selectors.table).should('exist');
    cy.get(selectors.sortIcon).should('have.length', 3);
  });

  it('should call the onChange callback with message sort', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Table value={config} onChange={onChange} />);
    cy.get(`${selectors.columnHeader}:first ${selectors.sortIconClassName}`).click();
    cy.get('@onChange').should('be.calledWith', 'sort');
  });

  it('should allow selecting and deselecting a single row', () => {
    cy.spy(config.rows[0].events, 'onClick').as('onClickSpy');
    cy.mount(
      <Table
        value={{
          ...config,
          ...configSelectable,
        }}
      />,
    );
    cy.get(`${selectors.row}:eq(0)`).find(selectors.checkbox).check();
    cy.get('@onClickSpy').should('be.called');
  });

  it('selects all rows if checking the header select all checkbox', () => {
    cy.mount(
      <Table
        value={{
          ...config,
          ...configSelectable,
        }}
      />,
    );

    cy.get(selectors.selectAllCheckbox)
      .should('not.be.checked')
      .check();

    cy.get(selectors.selectAllCheckbox)
      .should('be.checked')
      .get(selectors.allRowCheckboxes)
      .should('be.checked');

    // unselecting a row makes the selectAllCheckbox not to be checked
    cy.get(selectors.allRowCheckboxes)
      .eq(0)
      .uncheck();

    cy.get(selectors.selectAllCheckbox)
      .should('not.be.checked');
  });

  it('renders an empty table cell if a row has no value specified for a column', () => {
    cy.mount(
      <Table
        value={{
          columns: [{ id: 'col1', name: 'Col1' }],
          rows: [{ values: {} }],
        }}
      />,
    );

    cy.get(selectors.row)
      .eq(0)
      .find('td')
      .should('be.empty');
  });

  it('columns can render different things based on its "type"', () => {
    cy.mount(
      <Table
        value={{
          columns: [{ id: 'col1', name: 'Col1', type: Checkbox }],
          rows: [{ values: { col1: {} } }],
        }}
      />,
    );

    cy.get(selectors.row)
      .eq(0)
      .find('td input')
      .should('exist');
  });
});
