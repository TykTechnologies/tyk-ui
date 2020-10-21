import React, { Component } from 'react';
import PropTypes from 'prop-types';


/**
 * Radio can be used when a user needs to select at most one value from a multiple options.
 */
export default class Radio extends Component {
  static propTypes = {
    /** Used to disable the element */
    disabled: PropTypes.bool,
    /** Align radio with in same line with other elements */
    inline: PropTypes.bool,
    /** Set a theme for radio */
    theme: PropTypes.string,
    input: PropTypes.instanceOf(Object),
    /** Adds label to the radio input */
    label: PropTypes.string,
    /** Set name for the radio input */
    name: PropTypes.string,
    /** If set to true removes margin by adding `no-margin` class */
    nospace: PropTypes.bool,
    /** Set initial value for the radio input */
    value: PropTypes.string,
    /** Add note at the bottom of the radio input */
    note: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.node,
    ]),
  };

  getCssClasses() {
    const {
      inline, nospace, theme = '', disabled,
    } = this.props;
    const cssClasses = [];

    if (inline) {
      cssClasses.push('tyk-radio--inline');
    } else {
      cssClasses.push('tyk-radio');
    }

    if (nospace) {
      cssClasses.push('no-margin');
    }

    if (theme.trim()) {
      cssClasses.push(...theme.split(' ').map(t => `tyk-radio--theme-${t}`));
    }

    if (disabled) {
      cssClasses.push('tyk-radio--is-disabled');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      input, label, note, ...rest
    } = this.props;
    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            {...input}
            {...rest}
            type="radio"
          />
          {label}
        </label>
        <p className="tyk-form-control__help-block">{note}</p>
      </div>
    );
  }
}
