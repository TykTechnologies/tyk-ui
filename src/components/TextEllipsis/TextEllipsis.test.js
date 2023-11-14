import React from 'react';
import TextEllipsis from './index';

function Component() {
  return (
    <div className="text-ellipsis" style={{ marginTop: '200px', textAlign: 'center' }}>
      <TextEllipsis
        text="alpha, bravo, charlie, delta, forgot the rest"
        limit={10}
      />
    </div>
  );
}

describe('TextEllipsis', () => {
  const classes = {
    floatingContainer: 'floating-container',
  };
  it('should show just first 10 chars followed by "..."', () => {
    cy.mount(<Component />)
      .get('.text-ellipsis')
      .should('have.text', 'alpha, bra...');
  });
  it('when hovering the shrinked texts, shows the tooltip with full text', () => {
    cy.mount(<Component />);
    cy.get(`.${classes.floatingContainer}`)
      .should('not.exist')
      .get('.text-ellipsis')
      .trigger('mouseover')
      .get(`.${classes.floatingContainer}`)
      .should('exist');
  });
});
