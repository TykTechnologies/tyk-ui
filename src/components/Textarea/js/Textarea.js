import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Textarea extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.instanceOf(Object),
    error: PropTypes.string,
    label: PropTypes.string,
    labelWidth: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    id: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.string,
  };

  getCssClasses() {
    const { error, theme, labelWidth } = this.props;
    const cssClasses = ['tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (labelWidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  getLabelStyles() {
    const { labelWidth } = this.props;
    const styles = {};

    if (labelWidth) {
      styles.flexBasis = labelWidth;
    }

    return styles;
  }

  getNonLabelWidth() {
    const { labelWidth } = this.props;
    const styles = {};

    if (labelWidth) {
      styles.flexBasis = `calc(100% - ${labelWidth} - 20px)`;
    }

    return styles;
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
              ? <label htmlFor={id} style={this.getLabelStyles()}>{ label }</label>
              : null
          }
          <div
            className="tyk-form-control__wrapper"
            style={this.getNonLabelWidth()}
          >
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
