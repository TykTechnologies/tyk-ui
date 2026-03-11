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
  const defaultMessageValue = "Test message";

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
    placement: {
      'top-center': 'tyk-toast__container--top-center',
      'top-right': 'tyk-toast__container--top-right',
      'bottom-center': 'tyk-toast__container--bottom-center',
      'bottom-right': 'tyk-toast__container--bottom-right',
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
    placement: {
      'top-center': `.${classNames.placement["top-center"]}`,
      'top-right': `.${classNames.placement["top-right"]}`,
      'bottom-center': `.${classNames.placement["bottom-center"]}`,
      'bottom-right': `.${classNames.placement["bottom-right"]}`
    },
  };

  beforeEach(() => {
    toast.reset();
  });

  describe('Default behavior (no configuration)', () => {
    it('should use default delay (3000ms) and placement (bottom-center) when no configuration is provided', () => {
      cy.clock();

      const onClick = () => toast.notify(defaultMessageValue);
      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.toastContainer)
        .should('have.class', classNames.placement['bottom-center'])
        .find(selectors.message)
        .and('have.class', classNames.theme.success)
        .and('have.text', defaultMessageValue);

      cy.tick(3000)

      cy.get(selectors.message).should('not.exist');

      cy.clock().invoke('restore')
    });

    it('should use default theme (success) when no theme is specified', () => {
      const onClick = () => toast.notify(defaultMessageValue);
      cy.mount(<Component onClick={onClick} />)
      cy.get('button').click();

      cy.get(selectors.message)
        .should('have.class', classNames.theme.success)
        .find(selectors.icons.icon)
        .should('have.class', classNames.icons.success);
    });
  });

  describe('General configuration - delay', () => {
    beforeEach(() => cy.clock());
    afterEach(() => cy.clock().invoke('restore'));

    it('should use general.delay when provided and no theme delay exists', () => {
      toast.configure({
        general: { 
          delay: 500,
        }
      });

      const onClick = () => toast.success(defaultMessageValue);
      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.message);

      cy.tick(500);

      cy.get(selectors.message) .should('not.exist');
    });

    it('should apply general.delay to all themes when theme delays are not specified', () => {
      toast.configure({
        general: { delay: 500 }
      });

      const themes = ['success', 'danger', 'warning', 'info'];
      
      themes.forEach((theme) => {
        const onClick = () => toast[theme](`${theme} message`);
        
        cy.mount(<Component onClick={onClick} />);
        cy.get('button').click();

        cy.get(selectors.message).should('have.class', classNames.theme[theme]);

        cy.tick(500);

        cy.get(selectors.message).should('not.exist');
      });
    });
  });

  describe('Theme-specific configuration - delay', () => {
    beforeEach(() => cy.clock());
    afterEach(() => cy.clock().invoke('restore'));

    it('should use theme delay when provided (overriding general delay)', () => {
      toast.configure({
        general: { delay: 1000 },
        themes: {
          success: { delay: 500 }
        }
      });

      const onClick = () => toast.success(defaultMessageValue);
      
      cy.mount(<Component onClick={onClick} />)
      cy.get('button').click();

      cy.get(selectors.message);

      cy.tick(500);

      cy.get(selectors.message).should('not.exist');
    });

    it('should use different delays for different themes', () => {
      toast.configure({
        themes: {
          success: { delay: 500 },
          danger: { delay: 6000 },
        }
      });

      const onClickSuccess = () => toast.success('Success message');
      cy.mount(<Component onClick={onClickSuccess} />);
      cy.get('button').click();

      cy.get(selectors.theme.success);

      cy.tick(500);

      cy.get(selectors.theme.success).should('not.exist');

      const onClickDanger = () => toast.danger('Danger message');
      cy.mount(<Component onClick={onClickDanger} />)
      cy.get('button').click();

      cy.get(selectors.theme.danger);

      cy.tick(6000);

      cy.get(selectors.theme.danger).should('not.exist');
    });

    it('should fall back to general delay for themes without specific delay', () => {
      toast.configure({
        general: { delay: 1000 },
        themes: {
          success: { delay: 500 }
        }
      });

      const onClickSuccess = () => toast.success('Success');
      cy.mount(<Component onClick={onClickSuccess} />)
      cy.get('button').click();

      cy.get(selectors.theme.success);

      cy.tick(500);

      cy.get(selectors.theme.success).should('not.exist');

      const onClickDanger = () => toast.danger('Danger');
      cy.mount(<Component onClick={onClickDanger} />)
      cy.get('button').click();

      cy.get(selectors.theme.danger);

      cy.tick(1000);

      cy.get(selectors.theme.danger).should('not.exist');
    });
  });

  describe('Per-call options - delay', () => {
    beforeEach(() => cy.clock());
    afterEach(() => cy.clock().invoke('restore'));

    it('should use per-call delay option (overriding both general and theme delays)', () => {
      toast.configure({
        general: { delay: 2000 },
        themes: {
          success: { delay: 1000 }
        }
      });

      const onClick = () => toast.success(defaultMessageValue, { delay: 500 });
      
      cy.mount(<Component onClick={onClick} />)
      cy.get('button').click();

      cy.get(selectors.message);

      cy.tick(500);

      cy.get(selectors.message).should('not.exist');
    });

    it('should allow different delays for multiple toasts of the same theme', () => {
      const onClick = () => {
        toast.success('first message', { delay: 500 });
        toast.success('second message', { delay: 1000 });
      };
      
      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.message)
        .should('have.length', 2);

      cy.tick(500);

      cy.get(selectors.message)
        .should('have.length', 1)
        .and('contain.text', 'second message');

      cy.tick(500);

      cy.get(selectors.message).should('not.exist');
    });
  });

  describe('General config - placement', () => {
    it('should use general.placement when provided', () => {
      toast.configure({
        general: {
          placement: { from: 'top', align: 'right' }
        }
      });

      const onClick = () => toast.notify(defaultMessageValue);

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.toastContainer)
        .should('have.class', classNames.placement['top-right']);
    });

    it('should support all valid placement combinations', () => {
      const placements = [
        { from: 'top', align: 'center', expected: 'top-center' },
        { from: 'top', align: 'right', expected: 'top-right' },
        { from: 'bottom', align: 'center', expected: 'bottom-center' },
        { from: 'bottom', align: 'right', expected: 'bottom-right' }
      ];

      placements.forEach(({ from, align, expected }) => {
        it(`should support placement: ${expected}`, () => {
          toast.configure({
            general: { placement: { from, align } }
          });

          const onClick = () => toast.notify(`${expected} message`);
          cy.mount(<Component onClick={onClick} />);
          cy.get('button').click();

          cy.get(selectors.toastContainer)
            .should('have.class', classNames.placement[expected]);
        });
      });
    });
  });

  describe('Placement edge cases - invalid values', () => {
    it('should fallback to "bottom" when invalid "from" value is provided', () => {
      cy.spy(console, 'warn').as('consoleWarn');

      toast.configure({
        general: {
          placement: { from: 'invalid', align: 'center' }
        }
      });

      const onClick = () => toast.notify(defaultMessageValue);

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.toastContainer)
        .should('have.class', classNames.placement['bottom-center']);

      cy.get('@consoleWarn').should('be.calledWith',
        '[Tyk UI Toast] Invalid placement.from: "invalid". Allowed values are: bottom, top. Falling back to "bottom".'
      );
    });

    it('should fallback to "center" when invalid "align" value is provided', () => {
      cy.spy(console, 'warn').as('consoleWarn');

      toast.configure({
        general: {
          placement: { from: 'top', align: 'invalid' }
        }
      });

      const onClick = () => toast.notify(defaultMessageValue);

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.toastContainer)
        .should('have.class', classNames.placement['top-center']);

      cy.get('@consoleWarn').should('be.calledWith',
        '[Tyk UI Toast] Invalid placement.align: "invalid". Allowed values are: right, center. Falling back to "center".'
      );
    });

    it('should fallback to defaults when both placement values are invalid', () => {
      cy.spy(console, 'warn').as('consoleWarn');

      toast.configure({
        general: {
          placement: { from: 'invalid', align: 'invalid' }
        }
      });

      const onClick = () => toast.notify(defaultMessageValue);

      cy.mount(<Component onClick={onClick} />)
        .get('button')
        .click();

      cy.get(selectors.toastContainer)
        .should('have.class', classNames.placement['bottom-center']);

      cy.get('@consoleWarn').should('have.callCount', 2);
    });
  });

  describe('Theme method edge cases', () => {
    it('should handle theme methods with undefined options', () => {
      const onClick = () => toast.success(defaultMessageValue, undefined);

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.message).and('have.class', classNames.theme.success);
    });

    it('should handle theme methods with null options', () => {
      const onClick = () => toast.danger(defaultMessageValue, null);

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.message).and('have.class', classNames.theme.danger);
    });

    it('should override theme when passed in options to theme methods', () => {
      const onClick = () => toast.success(defaultMessageValue, { theme: 'danger' });

      cy.mount(<Component onClick={onClick} />);
      cy.get('button').click();

      cy.get(selectors.message).should('have.class', classNames.theme.success);
    });
  });

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
