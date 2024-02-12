import React from 'react';
import Row from '../Row';
import Column from './index';

const selectors = {
  component: '.tyk-col',
  row: '.tyk-row',
};

// eslint-disable-next-line react/prop-types
function Component({ children, ...rest }) {
  return (
    <Row style={{ blockSize: '300px', border: '1px solid blue' }}>
      <Column size="lg-6 md-6" {...rest}>{children ?? 'column content'}</Column>
    </Row>
  );
}

describe('Column', () => {
  it('renders the component', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist');
  });

  it('can specify the size of the column', () => {
    const gutterWidth = 20;
    cy.mount(<Component size="lg-3 md-3" />);

    cy
      .get(selectors.row)
      .then(($row) => {
        cy.get(selectors.component).should(($col) => {
          expect($col.width()).to.equal(($row.width() / 4 - gutterWidth));
        });
      });
  });

  it('can align vertically in the row', () => {
    cy.mount(<Component align="center" />)
      .get(selectors.component)
      .invoke('offset')
      .its('top')
      .then((top) => {
        expect(top).to.be.gt(100);
      });
  });

  it('can have custom class names', () => {
    const customClass = 'custom-class';
    cy.mount(<Component className={customClass} />)
      .get(selectors.component)
      .should('have.class', customClass);
  });

  it('can have an offset from the left', () => {
    cy.mount(<Component offset="lg-2 md-2" />)
      .get(selectors.component)
      .should('have.class', 'tyk-col--offset-lg-2')
      .and('have.class', 'tyk-col--offset-md-2');
  });
});
