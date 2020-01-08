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
    value: PropTypes.string,
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

  render() {
    const { input, label, ...rest } = this.props;
    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            checked={input.value}
            {...input}
            {...rest}
            type="checkbox"
          />
          {label}
        </label>
      </div>
    );
  }
}
