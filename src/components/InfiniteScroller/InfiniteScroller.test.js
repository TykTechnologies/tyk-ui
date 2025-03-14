import React, { useRef } from 'react';
import InfiniteScroller from './index';

// eslint-disable-next-line react/prop-types
function Component({ content, ...rest }) {
  const refChild = useRef();

  return (
    <div style={{ blockSize: '300px' }}>
      <InfiniteScroller refChild={refChild} {...rest}>
        <div ref={refChild}>
          { content ?? <h1>The Content</h1> }
        </div>
      </InfiniteScroller>
    </div>
  );
}

describe('InfiniteScroller', () => {
  const selectors = {
    scroller: '.tyk-infinite-scroller',
    wrapper: '.tyk-infinite-scroller__wrapper',
    loader: '.loading',
  };

  it('renders content inside the component', () => {
    cy.mount(<Component />)
      .get(selectors.scroller)
      .find('h1')
      .should('have.text', 'The Content');
  });

  it('if it is the initial load calls the loadMore callback', () => {
    const loadMore = cy.stub();
    cy.mount(<Component initialLoad loadMore={loadMore} />)
      .then(() => {
        expect(loadMore).to.be.called;
      });
  });

  it('scrolling to the bottom loads the next page', () => {
    const loadMore = cy.stub().as('loadMore');
    const content = (
      <>
        {[...Array(50)].map((_, index) => (
          <div key={index} style={{ blockSize: '20px' }}>{`Item ${index}`}</div>
        ))}
      </>
    );

    cy.mount(<Component content={content} hasMore loadMore={loadMore} pageNumber={0} />)
      .get(selectors.wrapper)
      .scrollTo(0, 10);

    cy.wait(500)
      .get('@loadMore')
      .should('not.be.called');

    cy.get(selectors.wrapper)
      .scrollTo('bottom');

    cy.wait(500)
      .get('@loadMore')
      .should('be.called');
  });
});
