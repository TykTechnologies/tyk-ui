import React, { useRef } from 'react';
import FloatingContainer from './index';

const target = {
  width: 400,
  height: 200,
};

function Component(props) {
  const element = useRef();
  const defaultContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
  ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
  ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
  const { content = defaultContent, ...rest } = props; // eslint-disable-line react/prop-types

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '100px',
        marginBlockStart: '300px',
      }}
    >
      <div
        id="target"
        ref={element}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: `${target.width}px`,
          height: `${target.height}px`,
          backgroundColor: 'orange',
        }}
      >
        target element
      </div>
      <FloatingContainer
        element={element}
        {...rest}
      >
        <div
          style={{
            backgroundColor: 'pink',
            padding: '20px',
            height: '100%',
          }}
        >
          {content}
        </div>
      </FloatingContainer>
    </div>
  );
}

describe('FloatingContainer', () => {
  const selectors = {
    target: '#target',
    floatingContainer: '.floating-container',
  };

  it('displays the floating container under the target element', () => {
    cy.mount(<Component />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('have.css', 'top', `${$target.position().top + $target.height()}px`);
      });
  });

  it('size="matchElement" matches the sizes of the floating container and the target element', () => {
    cy.mount(<Component size="matchElement" />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.width()).to.equal($target.width());
          });
      });
  });

  it('size=function can set a custom size', () => {
    const sizeFn = (targetWidth) => targetWidth - 100;
    cy.mount(<Component size={sizeFn} />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.width()).to.equal(sizeFn($target.width()));
          });
      });
  });

  it('the position relative to the target element can be forced', () => {
    const sizeFn = (targetWidth) => targetWidth - 100;
    cy.mount(<Component size={sizeFn} forceDisplay="right" />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('have.css', 'left', `${$target.position().left + $target.width()}px`);
      });
  });

  it('the position can be forced to top, e.g. for a tooltip', () => {
    cy.mount(<Component forceDisplay="top" />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.position().top)
              .to.equal($target.position().top - $container.height());
          });
      });
  });

  it('the default display axis can be changed with displayAxis', () => {
    cy.mount(<Component displayAxis="horizontal" />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.position().left)
              .to.equal($target.position().left - $container.width());
          });
      });
  });

  it('we can preffer a side if there\'s room on both sides', () => {
    cy.mount(<Component displayAxis="horizontal" preferredPosition="right" content="small content" />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.position().left)
              .to.equal($target.position().left + $target.width());
          });
      });
  });

  it('we can specify an offset = distance from the target element', () => {
    const offset = -100;
    cy.mount(<Component offset={offset} />);

    cy
      .get(selectors.target)
      .then(($target) => {
        cy.get(selectors.floatingContainer)
          .should('be.visible')
          .then(($container) => {
            expect($container.position().top)
              .to.equal($target.position().top + $target.height() + offset);
          });
      });
  });
});
