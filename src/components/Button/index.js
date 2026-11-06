import React, { cloneElement, forwardRef } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon';

/**
 * The Button component represents an interactive element that triggers an action,
 * navigates to a link when `href` is supplied, or wraps a custom component (such as a router Link).
 * It supports multiple themes, sizes, icons, and states.
 */
const Button = forwardRef(function Button(props, ref) {
  const {
    customButton,
    children,
    iconType,
    iconFamily,
    iconPosition,
    iconOnly,
    id,
    className,
    disabled,
    display,
    href,
    onClick,
    noStyle,
    size,
    theme = '',
    type = 'button',
    ...rest
  } = props;

  const getCssClasses = () => {
    const cssClasses = ['tyk-button'].concat(className ? className.split(' ') : []);
    const sizeClass = (size) ? `tyk-button--${size}` : 'tyk-button--md';
    const disabledClass = (disabled) ? 'disabled' : '';
    const displayClass = display || '';
    const themeClass = theme ? `tyk-button--${theme}` : '';
    const iconOnlyClass = iconOnly ? 'tyk-button--icon-only' : '';
    const noStyleClass = noStyle ? 'tyk-button--no-style' : '';

    cssClasses.push(iconOnlyClass);
    cssClasses.push(themeClass);
    cssClasses.push(sizeClass);
    cssClasses.push(disabledClass);
    cssClasses.push(displayClass);
    cssClasses.push(noStyleClass);

    if (iconType) {
      cssClasses.push(`icon-${iconPosition || 'left'}`);
    }

    return cssClasses.join(' ');
  };

  const getButtonIcon = (position) => {
    const iPos = iconPosition || 'left';

    return (
      (iconType && iPos === position)
        ? <Icon family={iconFamily} type={iconType} />
        : null
    );
  };

  const getButtonType = () => {
    let buttonType;

    if (customButton) {
      return (
        <>
          { cloneElement(customButton, {
            className: getCssClasses(),
            disabled,
          })}
        </>
      );
    }

    if (href) {
      buttonType = (
        <a
          id={id}
          className={getCssClasses()}
          disabled={disabled}
          onClick={onClick}
          href={href}
          ref={ref}
          {...rest}
        >
          { getButtonIcon('left') }
          { children }
          { getButtonIcon('right') }
        </a>
      );
    } else {
      buttonType = (
        <button
          id={id}
          className={getCssClasses()}
          disabled={disabled}
          onClick={onClick}
          type={type || 'button'}
          ref={ref}
          {...rest}
        >
          { getButtonIcon('left') }
          { children && <span>{children}</span> }
          { getButtonIcon('right') }
        </button>
      );
    }

    return buttonType;
  };

  return (
    getButtonType()
  );
});

Button.propTypes = {
  /**
   * Content of the button. Can be text, a DOM element, or a React component
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  /**
   * Custom React element to clone and render with button styles and state (e.g. router Link)
   */
  customButton: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
  ]),
  /**
   * Additional CSS classes to apply to the button
   */
  className: PropTypes.string,
  /**
   * Display type: 'inline' or 'block'. Default is 'inline'
   */
  display: PropTypes.string,
  /**
   * Sets the button to disabled state
   */
  disabled: PropTypes.bool,
  /**
   * HTML id attribute for the button or link element
   */
  id: PropTypes.string,
  /**
   * When provided, renders the button as an anchor `<a>` element linking to this URL
   */
  href: PropTypes.string,
  /**
   * Position of the icon relative to the label: 'left' or 'right'. Default is 'left'
   */
  iconPosition: PropTypes.string,
  /**
   * Icon font family to use: 'tykon' or FontAwesome (default)
   */
  iconFamily: PropTypes.string,
  /**
   * Whether the button contains only an icon without label text
   */
  iconOnly: PropTypes.bool,
  /**
   * Name/type of the icon to display (e.g. 'check', 'copy', 'plus', 'trash')
   */
  iconType: PropTypes.string,
  /**
   * Removes default button styling (borders, background)
   */
  noStyle: PropTypes.bool,
  /**
   * Callback function called when the button is clicked
   */
  onClick: PropTypes.func,
  /**
   * Visual theme variant: solid ('primary', 'secondary', 'danger', 'success', 'info', 'warning'),
   * outline ('primary-outline', ...), or link ('primary-link', ...)
   */
  theme: PropTypes.string,
  /**
   * HTML type attribute for the button element ('button', 'submit', 'reset'). Default is 'button'
   */
  type: PropTypes.string,
  /**
   * Size of the button: 'sm', 'md', 'lg', or 'fit'. Default is 'md'
   */
  size: PropTypes.string,
};

export default Button;
