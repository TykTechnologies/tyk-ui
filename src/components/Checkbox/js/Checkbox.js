import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * Tyk Cechbox component.
 */
export default class Checkbox extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  getCssClasses() {
    const cssClasses = [];

    if (this.props.inline) {
      cssClasses.push('tyk-checkbox--inline');
    } else {
      cssClasses.push('tyk-checkbox');
    }

    return cssClasses.join(' ');
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            {...input}
            {...rest}
            type="checkbox"
          />
          {this.props.label}
        </label>
      </div>
    );
  }
}
