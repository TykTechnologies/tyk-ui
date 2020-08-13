import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    inline: PropTypes.bool,
    theme: PropTypes.string,
    input: PropTypes.instanceOf(Object),
    label: PropTypes.string,
    name: PropTypes.string,
    nospace: PropTypes.string,
    value: PropTypes.string,
    description: PropTypes.oneOfType([
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
      input, label, description, ...rest
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
        <p className="tyk-radio__description-text">{description}</p>
      </div>
    );
  }
}
