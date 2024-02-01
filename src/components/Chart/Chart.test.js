import React from 'react';
import Chart from './index';

function Component(props) {
  return (
    <Chart
      hasData
      dataLoaded
      option={{
        xAxis: {
          data: ['Jan', 'Feb', 'Mar'],
        },
        yAxis: [{ min: 0 }],
      }}
      series={[
        {
          data: [5, 12, 8],
        },
      ]}
      {...props}
    />
  );
}

const selectors = {
  component: '.tyk-chart',
  loader: '.loading',
  message: '.tyk-message',
};

describe('Chart', () => {
  it('renders the component', () => {
    cy.mount(<Component />);

    cy.get(selectors.component)
      .should('exist');
  });

  it('renders a loader if dataLoaded is false', () => {
    cy.mount(<Component dataLoaded={false} />);

    cy.get(selectors.loader)
      .should('exist');
  });

  it('renders a message if hasData is false', () => {
    cy.mount(<Component hasData={false} />);

    cy.get(selectors.message)
      .should('exist');
  });

  it('can render a custom component instead of the no data message', () => {
    cy.mount(<Component hasData={false} noDataComponent={() => <span id="custom-no-data-component">custom no data</span>} />);

    cy.get('#custom-no-data-component')
      .should('exist');
  });

  it('can have different types', () => {
    cy.mount(<Component type="bar" />);

    cy.get(selectors.component)
      .should('have.attr', 'data-type', 'bar');

    cy.mount(<Component type="pie" />);

    cy.get(selectors.component)
      .should('have.attr', 'data-type', 'pie');

    cy.mount(<Component type="geo" option={[]} series={[{ map: 'world' }]} />);

    cy.get(selectors.component)
      .should('have.attr', 'data-type', 'geo');
  });

  it('can specify the width and height of the component using the style prop', () => {
    const width = '500px';
    const height = '200px';
    cy.mount(<Component style={{ width, height }} />);

    cy.get(selectors.component)
      .should('have.css', 'width', width)
      .and('have.css', 'height', height);
  });
});
