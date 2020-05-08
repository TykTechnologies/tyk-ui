import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Tyk Cechbox component.
 */
export default class Checkbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    theme: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    input: PropTypes.instanceOf(Object),
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
  };

  getCssClasses() {
    const { inline, disabled, theme = '' } = this.props;
    const cssClasses = [];

    cssClasses.push('tyk-checkbox');

    if (inline) {
      cssClasses.push('tyk-checkbox--inline');
    }

    if (theme.trim()) {
      cssClasses.push(...theme.split(' ').map(t => `tyk-checkbox--theme-${t}`));
    }

    if (disabled) {
      cssClasses.push('tyk-checkbox--is-disabled');
    }

    return cssClasses.join(' ');
  }

  displayError() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <p className="tyk-form-control__error-message">
        {error}
      </p>
    );
  }

  render() {
    const {
      input, value, label, ...rest
    } = this.props;
    return (
      <div
        className={this.getCssClasses()}
      >
        <div className="tyk-form-control__wrapper">
          <label>
            <input
              checked={input ? input.value : value}
              {...input}
              {...rest}
              type="checkbox"
            />
            {label}
          </label>
          {this.displayError()}
        </div>
      </div>
    );
  }
}
