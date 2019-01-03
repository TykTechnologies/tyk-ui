import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Radio extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    noSpace: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string
  };

  getCssClasses() {
    const { inline, nospace } = this.props;
    let cssClasses = [];

    if(inline) {
      cssClasses.push('tyk-radio--inline');
    } else {
      cssClasses.push('tyk-radio');
    }

    if(nospace) {
      cssClasses.push('no-margin');
    }

    return cssClasses.join(' ');
  }

  render() {
    const { input, ...rest } = this.props;
    return (
      <div
        className={ this.getCssClasses() }
      >
        <label>
          <input
            { ...input }
            { ...rest }
            type="radio"
          /> { this.props.label }
        </label>
      </div>
    );
  }
}
