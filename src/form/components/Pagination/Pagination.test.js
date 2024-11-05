import React from 'react';
import Pagination from './index';

const totalNrOfPages = 10;

function Component(props) {
  return (
    <Pagination totalNrOfPages={totalNrOfPages} {...props} />
  );
}

const classes = {
  active: 'active',
};

const selectors = {
  component: '.tyk-pagination',
  item: '.tyk-pagination > li',
};

describe('Pagination', () => {
  it('renders the component with the first page active by default and a "Next" item at the end', () => {
    cy.mount(<Component />)
      .get(selectors.component)
      .should('exist')
      .get(selectors.item)
      .eq(0)
      .should('have.class', classes.active)
      .get(selectors.item)
      .last()
      .should('have.text', 'Next');
  });

  it('can specify the selected page and show a "Previous" item if the page is not the first one', () => {
    const selectedPage = 5;
    const itemToCheck = selectedPage + 1; // +1 for the "Previous" item
    cy.mount(<Component value={selectedPage} />)
      .get(selectors.item)
      .eq(itemToCheck)
      .should('have.class', classes.active)
      .get(selectors.item)
      .eq(0)
      .should('have.text', 'Previous');
  });

  it('can specify the total number of pages', () => {
    const lastPageIndex = 4;
    cy.mount(<Component value={2} totalNrOfPages={lastPageIndex} />)
      .get(selectors.item)
      .should('have.length', lastPageIndex + 1);
  });

  it('clicking on a page changes the active page to that one', () => {
    const currentPage = 2;
    const pageToClick = 4;
    cy.mount(<Component value={currentPage} totalNrOfPages={5} />)
      .get(selectors.item)
      .eq(pageToClick)
      .as('clickedPage')
      .click();
    cy.get('@clickedPage')
      .should('have.class', classes.active);
  });

  it('clicking on "Next" increments the current page and clicking on "Previous" decrements the current page', () => {
    const currentPage = 2;
    // extra +1 because the value passed to the component is actually a 0-based index
    const actualPageNumber = currentPage + 1;

    cy.mount(<Component value={currentPage} totalNrOfPages={7} />);

    cy.get(selectors.item)
      .eq(actualPageNumber)
      .should('have.class', classes.active);

    cy.get(selectors.item)
      .contains('Next')
      .click();
    cy.get(selectors.item)
      .eq(actualPageNumber + 1)
      .should('have.class', classes.active);

    cy.get(selectors.item)
      .contains('Previous')
      .click();
    cy.get(selectors.item)
      .eq(actualPageNumber)
      .should('have.class', classes.active);
  });

  it('calls the onChange callback when the page changes', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<Component onChange={onChange} />);

    cy.get(selectors.item)
      .last()
      .click();
    cy.get('@onChange').should('be.called');
  });
});
