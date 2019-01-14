import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';
/**
 * Tyk button component.
 */
export default class Button extends Component {
  static propTypes = {
    /**
    * Button id.
    */
    buttonId: PropTypes.string,
    /**
    * Content of a button. Can be a DOM element or a React component
    */
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string
    ]),
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
    href: PropTypes.string,
    iconPosition: PropTypes.string, //left or right
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
    type: PropTypes.string,
    /**
    * Describes the size of the button (sm, md, lg). Default one is md
    */
    size: PropTypes.string
  };

  static defaultProps = {
    theme: ''
  };

  getCssClasses() {
    const {
      iconType,
      iconPosition,
      iconOnly,
      className,
      size,
      disabled,
      display,
      theme
    } = this.props;

    let cssClasses = ['tyk-button'].concat(className ? className.split(' ') : []);
    let sizeClass = (size) ? `tyk-button--${size}` : 'tyk-button--md';
    let disabledClass = (disabled) ? 'disabled' : '';
    let displayClass = display || '';
    let themeClass = theme ? `tyk-button--${theme}` : '';
    let iconOnlyClass = iconOnly ? 'tyk-button--icon-only' : '';

    cssClasses.push(iconOnlyClass);
    cssClasses.push(themeClass);
    cssClasses.push(sizeClass);
    cssClasses.push(disabledClass);
    cssClasses.push(displayClass);

    if(iconType) {
      cssClasses.push('icon-' + (iconPosition || 'left'));
    }

    return cssClasses.join(' ');
  }

  getButtonIcon(position) {
    const { iconType, iconPosition } = this.props;

    let iPos = iconPosition || 'left';

    return (
      (iconType && iPos === position)
        ? <Icon type={ iconType }></Icon>
        : null
    );
  }

  render() {
    const {
      id,
      disabled,
      href,
      onClick,
      type } = this.props;

    return (
      <Fragment>
      {
        href
          ? <a
              id={ id }
              className={ this.getCssClasses() }
              disabled={ disabled }
              onClick={ onClick }
              href={ href }
              type={ type }
            >
              { this.getButtonIcon('left') }
              { this.props.children }
              { this.getButtonIcon('right') }
            </a>
          : <button
              id={ id }
              className={ this.getCssClasses() }
              disabled={ disabled }
              onClick={ onClick }
              type={ type }
            >
              { this.getButtonIcon('left') }
              { this.props.children && <span>{ this.props.children }</span> }
              { this.getButtonIcon('right') }
            </button>
      }
      </Fragment>
    );
  }
}
