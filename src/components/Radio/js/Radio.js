import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    input: PropTypes.instanceOf(Object),
    label: PropTypes.string,
    name: PropTypes.string,
    nospace: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  getCssClasses() {
    const { inline, nospace } = this.props;
    const cssClasses = [];

    if (inline) {
      cssClasses.push('tyk-radio--inline');
    } else {
      cssClasses.push('tyk-radio');
    }

    if (nospace) {
      cssClasses.push('no-margin');
    }

    return cssClasses.join(' ');
  }

  render() {
    const {
      input, label, onChange = () => {}, ...rest
    } = this.props;
    return (
      <div
        className={this.getCssClasses()}
      >
        <label>
          <input
            {...input}
            {...rest}
            onChange={() => onChange(rest.value)}
            type="radio"
          />
          {label}
        </label>
      </div>
    );
  }
}
