import React from 'react';
import PropTypes from 'prop-types';
import toast from './index';

function Component(props) {
  return props.children || <button type="button" onClick={props.onClick}>Show Toast</button>;
}

Component.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
};

describe('Toast', () => {
  const classNames = {
    toast: 'tyk-toast',
    toastContainer: 'tyk-toast__container',
    message: 'tyk-toast__message',
    messageContent: 'tyk-message__content',
    theme: {
      success: 'tyk-message--success',
      danger: 'tyk-message--danger',
      info: 'tyk-message--info',
      warning: 'tyk-message--warning',
    },
    icons: {
      icon: 'tyk-icon',
      info: 'fa-circle-exclamation',
      danger: 'fa-hexagon-exclamation',
      success: 'fa-hexagon-check',
      warning: 'fa-triangle-exclamation',
    },
  };

  const selectors = {
    toast: `.${classNames.toast}`,
    toastContainer: `.${classNames.toastContainer}`,
    message: `.${classNames.message}`,
    messageContent: `.${classNames.messageContent}`,
    theme: {
      success: `.${classNames.theme.success}`,
      danger: `.${classNames.theme.danger}`,
      info: `.${classNames.theme.info}`,
      warning: `.${classNames.theme.warning}`,
    },
    icons: {
      icon: `.${classNames.icons.icon}`,
      success: `.${classNames.icons.success}`,
      warning: `.${classNames.icons.warning}`,
    },
  };

  it('should render toast components and remove it after the given delay', () => {
    cy.mount(<Component onClick={() => toast.notify('demo', { delay: 350 })} />)
      .get('button')
      .click();

    cy.get('button')
      .click();

    cy.get(selectors.toastContainer)
      .should('exist')
      .find(selectors.message)
      .should('exist')
      .and('have.length', 2)
      .and('have.class', classNames.theme.success)
      .get(selectors.toastContainer)
      .should('exist')
      .find(selectors.message, { timeout: 350 })
      .should('not.exist');
  });

  it('should display given message with correct icon for each theme', {}, () => {
    cy.wrap(Object.entries(classNames.theme)).each(([theme, className]) => {
      const onClick = () => toast[theme].bind(toast)(`demo ${theme}`, { timeout: 200 });
      cy.mount(<Component onClick={onClick} />)
        .get('button')
        .click();

      cy.get(selectors.toastContainer)
        .should('exist')
        .find(`.${classNames.message}.${className}`)
        .should('exist')
        .find(selectors.icons.icon)
        .should('exist')
        .and('have.class', classNames.icons[theme])
        .closest(selectors.message)
        .find(selectors.messageContent)
        .should('exist')
        .and('have.text', `demo ${theme}`);
    });
  });
});
