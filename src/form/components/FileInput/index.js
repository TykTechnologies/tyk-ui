import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';

export default class FileInput extends Component {
  static propTypes = {
    accept: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    label: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.element,
      PropTypes.func,
      PropTypes.string,
    ]),
    labelwidth: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    theme: PropTypes.string,
    value: PropTypes.instanceOf(Object),
  }

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.fileInputRef = createRef();
  }

  getCssClasses() {
    const { error, theme, labelwidth } = this.props;
    const cssClasses = ['tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  getLabelStyles() {
    const { labelwidth } = this.props;
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = labelwidth;
    }

    return styles;
  }

  getNonLabelWidth() {
    const { labelwidth } = this.props;
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styles;
  }

  getFileInputError() {
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

  getFileInputComponent() {
    const {
      accept, value: omitValue, onChange, ...rest
    } = this.props;

    return (
      <div
        className="tyk-file-input__wrapper"
        style={this.getNonLabelWidth()}
      >
        <input
          accept={accept}
          className="tyk-form-control"
          {...rest}
          onChange={this.handleOnChange}
          ref={this.fileInputRef}
          type="file"
        />
        {
          this.fileInputRef.current && this.fileInputRef.current.files.length > 0
            ? (
              <button
                onClick={this.clearValue}
                type="button"
              >
                <Icon type="times" />
              </button>
            )
            : null
        }
      </div>
    );
  }

  clearValue() {
    const { onChange } = this.props;
    this.fileInputRef.current.value = '';
    onChange('');
  }

  handleOnChange(e) {
    const { onChange } = this.props;

    onChange(e.target.files);
  }

  // eslint-disable-next-line class-methods-use-this
  reset() {}

  render() {
    const {
      id,
      label,
      note,
    } = this.props;

    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          {
            label
              ? <label htmlFor={id} style={this.getLabelStyles()}>{ label }</label>
              : null
          }
          <div className="tyk-form-control__wrapper">
            { this.getFileInputComponent() }
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
          </div>
          { this.getFileInputError() }
        </div>
      </Fragment>
    );
  }
}
