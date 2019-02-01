import React, { Component, Fragment, createRef } from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';

export default class FileInput extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
  }

  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
    this.clearValue = this.clearValue.bind(this);
    this.fileInputRef = createRef();
  }

  reset() {}

  clearValue() {
    const { onChange } = this.props;
    this.fileInputRef.current.value = '';
    onChange('');
  }

  _handleOnChange(e) {
    const { onChange } = this.props;

    onChange(e.target.files);
  }

  getFileInputComponent() {
    const { accept, value: omitValue, onChange, ...rest } = this.props;

    return (
      <div className="tyk-file-input__wrapper">
        <input
          accept={ accept }
          className="tyk-form-control"
          { ...rest }
          onChange={ this._handleOnChange }
          ref={ this.fileInputRef }
          type="file"
        />
        {
          this.fileInputRef.current && this.fileInputRef.current.files.length > 0
            ? <button
                onClick={ this.clearValue }
                type="button"
              >
                <Icon type="times"/>
              </button>
            : null
        }
      </div>
    );
  }

  getFileInputError() {
    const { error } = this.props;

    return (error && error !== 'true' && error !=='false')
      ? <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      : null;
  }

  getCssClasses() {
    const { error } = this.props;
    let cssClasses = ['tyk-form-group'];

    if(error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <Fragment>
        <div className={ this.getCssClasses() }>
          {
            this.props.label
              ? <label htmlFor={ this.props.id }>{ this.props.label }</label>
              : null
          }
          { this.getFileInputComponent() }
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getFileInputError() }
      </Fragment>
    );
  }
}
