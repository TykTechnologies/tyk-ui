import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';
/**
 * Button component.
 */

const Button = (props) => {
  const {
    children,
    iconType,
    iconPosition,
    iconOnly,
    id,
    className,
    disabled,
    display,
    href,
    onClick,
    size,
    theme,
    type,
  } = props;

  const getCssClasses = () => {
    const cssClasses = ['tyk-button'].concat(className ? className.split(' ') : []);
    const sizeClass = (size) ? `tyk-button--${size}` : 'tyk-button--md';
    const disabledClass = (disabled) ? 'disabled' : '';
    const displayClass = display || '';
    const themeClass = theme ? `tyk-button--${theme}` : '';
    const iconOnlyClass = iconOnly ? 'tyk-button--icon-only' : '';

    cssClasses.push(iconOnlyClass);
    cssClasses.push(themeClass);
    cssClasses.push(sizeClass);
    cssClasses.push(disabledClass);
    cssClasses.push(displayClass);

    if (iconType) {
      cssClasses.push(`icon-${iconPosition || 'left'}`);
    }

    return cssClasses.join(' ');
  };

  const getButtonIcon = (position) => {
    const iPos = iconPosition || 'left';

    return (
      (iconType && iPos === position)
        ? <Icon type={iconType} />
        : null
    );
  };


  return (
    <Fragment>
      {
        href
          ? (
            <a
              id={id}
              className={getCssClasses()}
              disabled={disabled}
              onClick={onClick}
              href={href}
            >
              { getButtonIcon('left') }
              { children }
              { getButtonIcon('right') }
            </a>
          )
          : (
            // eslint-disable-next-line react/button-has-type
            <button
              id={id}
              className={getCssClasses()}
              disabled={disabled}
              onClick={onClick}
              type={type}
            >
              { getButtonIcon('left') }
              { children && <span>{children}</span> }
              { getButtonIcon('right') }
            </button>
          )
      }
    </Fragment>
  );
};

Button.propTypes = {
  /**
  * Content of a button. Can be a DOM element or a React component
  */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  /**
  * Display type: inline/block. Default is inline
  */
  display: PropTypes.string,
  /**
  * Sets the button disabled state
  */
  disabled: PropTypes.bool,
  /**
  * Having this property set the button will become a link
  */
  id: PropTypes.string,
  href: PropTypes.string,
  iconPosition: PropTypes.string, // left or right
  iconOnly: PropTypes.bool,
  iconType: PropTypes.string,
  /**
  * Callback function, called when the button si clicked
  */
  onClick: PropTypes.func,
  /**
  * Describes the appearence of the button (ex: primary, danger, primary-outline etc.)
  */
  theme: PropTypes.string,
  /**
  * Type of the button (ex: button, submit etc.)
  */
  type: PropTypes.arrayOf(['submit', 'button', 'reset']),
  /**
  * Describes the size of the button (sm, md, lg). Default one is md
  */
  size: PropTypes.string,
};

Button.defaultProps = {
  theme: '',
  type: 'button',
};

export default Button;
