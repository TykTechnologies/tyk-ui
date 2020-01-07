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
  };

  getCssClasses() {
    const { inline } = this.props;
    const cssClasses = [];

    cssClasses.push('tyk-checkbox');

    if (inline) {
      cssClasses.push('tyk-checkbox--inline');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      input,
      label,
      onChange = () => {},
      value,
      ...rest
    } = this.props;

    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            checked={value}
            {...input}
            {...rest}
            onChange={e => onChange(e.target.checked)}
            type="checkbox"
          />
          {label}
        </label>
      </div>
    );
  }
}
