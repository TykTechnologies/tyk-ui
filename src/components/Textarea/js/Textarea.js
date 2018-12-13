import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import '../sass/Textarea.scss';

export default class Textarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    value: PropTypes.string
  };

  getCssClasses() {
    const { error } = this.props;
    let cssClasses = ['tyk-form-group'];

    if(error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  getTextareaError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !=='false')
      ? <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      : null;
  }

  render() {
    const { input, ...rest } = this.props;

    return (
      <Fragment>
        <div className={ this.getCssClasses() }>
          {
            this.props.label
              ? <label htmlFor={ this.props.id }>{ this.props.label }</label>
              : null
          }
          <textarea
            className="tyk-form-control"
            { ...rest }
            { ...input}
          >
            { this.props.value }
          </textarea>
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getTextareaError() }
      </Fragment>
    );
  }
}
