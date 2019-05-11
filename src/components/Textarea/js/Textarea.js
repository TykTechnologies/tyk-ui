import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Textarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.instanceOf(Object),
    error: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
  };

  getCssClasses() {
    const { error, theme } = this.props;
    const cssClasses = ['tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  getTextareaError() {
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
      id,
      input,
      label,
      note,
      value,
      ...rest
    } = this.props;

    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          {
            label
              ? <label htmlFor={id}>{label}</label>
              : null
          }
          <div className="tyk-form-control__wrapper">
            <textarea
              className="tyk-form-control"
              {...rest}
              {...input}
            >
              { value }
            </textarea>
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            {this.getTextareaError()}
          </div>
        </div>
      </Fragment>
    );
  }
}
