import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Tyk Cechbox component.
 */
export default class Checkbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    input: PropTypes.instanceOf(Object),
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  getCssClasses() {
    const { inline } = this.props;
    const cssClasses = [];

    if (inline) {
      cssClasses.push('tyk-checkbox--inline');
    } else {
      cssClasses.push('tyk-checkbox');
    }

    return cssClasses.join(' ');
  }

  getInputError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !== 'false')
      ? (
        <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      )
      : null;
  }

  render() {
    const {
      input,
      label,
      onChange = () => {},
      ...rest
    } = this.props;

    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            {...input}
            {...rest}
            onChange={e => onChange(e.target.checked)}
            type="checkbox"
          />
          {label}
        </label>
        { this.getInputError() }
      </div>
    );
  }
}
