import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './index';

function Component(props) {
  return (
    <Tabs {...props}>
      {/* eslint-disable-next-line react/prop-types, react/destructuring-assignment */}
      {props.children || (
        <>
          <Tabs.Tab
            selected
            id="tab1"
            title="Tab 1"
          >
            Tab 1
          </Tabs.Tab>
          <Tabs.Tab
            id="tab2"
            title="Tab 2"
          >
            Tab 2
          </Tabs.Tab>
        </>
      )}
    </Tabs>
  );
}

Component.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

describe('Tabs', () => {
  const classNames = {
    tabs: 'tyk-tabs',
    theme: {
      default: 'tyk-tabs--default',
      primary: 'tyk-tabs--primary',
      success: 'tyk-tabs--success',
      danger: 'tyk-tabs--danger',
      warning: 'tyk-tabs--warning',
      info: 'tyk-tabs--info',
    },
    tabContent: 'tyk-tab__content',
    active: 'active',
  };

  const selectors = {
    tabs: `.${classNames.tabs}`,
    tabContent: `.${classNames.tabContent}`,
    tabHeaderContainer: 'ul',
    tabHeader: 'li',
    button: 'button',
    active: `.${classNames.active}`,
  };

  it('should render the tab component with default theme', () => {
    cy.mount(<Component type="" />)
      .get(selectors.tabs)
      .should('exist')
      .and('have.class', classNames.theme.default);
  });

  it('should render with custom className', () => {
    cy.mount(<Component className="custom-tabs-class" />)
      .get(selectors.tabs)
      .should('exist')
      .and('have.class', 'custom-tabs-class');
  });

  it('should only show the selected tab', () => {
    cy.mount(
      <Component />,
    )
      .get(selectors.tabs)
      .should('exist')
      .and('have.class', classNames.theme.default)
      .find(selectors.tabContent)
      .should('have.length', 2)
      .filter(':visible')
      .should('have.length', 1)
      .and('have.text', 'Tab 1');
  });

  it('should hide tab contents when hideTabContent is set', () => {
    cy.mount(
      <Component hideTabContent />,
    )
      .get(selectors.tabs)
      .should('exist')
      .and('have.class', classNames.theme.default)
      .find(selectors.tabContent)
      .should('not.exist');
  });

  it('should call handler function on tab change and add active classes', () => {
    const onTabChange = cy.stub();

    cy.mount(<Component onTabChange={onTabChange} />)
      .get(selectors.tabs)
      .as('tabs')
      .find(selectors.tabHeaderContainer)
      .should('exist')
      .find(`>:not(${selectors.active})`)
      .should('have.length.greaterThan', 0)
      .filter(':first')
      .as('tabHeader')
      .find(selectors.button)
      .should('exist')
      .click()
      .then(() => {
        cy.get('@tabs')
          .should('exist')
          .find(selectors.active)
          .should('exist')
          .and('have.length', 1);

        cy.get('@tabHeader')
          .should('have.class', classNames.active);

        expect(onTabChange).to.be.called;
      });
  });

  it('should support different themes when type prop is supplied', () => {
    cy.wrap(Object.entries(classNames.theme)).each(([theme, themeClass]) => {
      cy.mount(<Component type={theme} />)
        .get(selectors.tabs)
        .should('exist')
        .and('have.class', themeClass);
    });
  });

  it('should show and hide tab using provided render function', () => {
    cy.mount(
      <Component>
        {
          ({ hideTab, showTab }) => (
            <>
              <Tabs.Tab
                selected
                id="tab1"
                title="Tab 1"
              >
                Tab 1
              </Tabs.Tab>
              <Tabs.Tab
                id="tab2"
                title="Tab 2"
              >
                <button id="hide" type="button" onClick={() => hideTab('tab1')}>Hide Tab 1</button>
                <button id="show" type="button" onClick={() => showTab('tab1')}>Show Tab 1</button>
              </Tabs.Tab>
            </>
          )
        }
      </Component>,
    ).get(selectors.tabs)
      .should('exist')
      .as('tabs')
      .find(selectors.tabHeaderContainer)
      .find(selectors.tabHeader)
      .should('exist')
      .and('have.length', 2)
      .filter(':contains(Tab 2)')
      .find(selectors.button)
      .should('exist')
      .and('have.length', 1)
      .click()
      .then(() => {
        cy.get('@tabs')
          .find('#hide')
          .should('exist')
          .click()
          .then(() => {
            cy.get('@tabs')
              .find(selectors.tabHeaderContainer)
              .find(selectors.tabHeader)
              .should('have.length', 1);
          })
          .then(() => {
            cy.get('@tabs')
              .find('#show')
              .should('exist')
              .click()
              .then(() => {
                cy.get('@tabs')
                  .find(selectors.tabHeaderContainer)
                  .find(selectors.tabHeader)
                  .should('have.length', 2);
              });
          });
      });
  });
});
