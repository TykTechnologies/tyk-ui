import React, { Component, Fragment, createRef } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';

import { Icon } from '../../Icon';

export default class DateTimePicker extends Component {
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

  state = {
    initValue: this.props.value,
    value: this.props.value
  };

  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleIconClick = this._handleIconClick.bind(this);
    this.datepickerRef = createRef();
  }

  reset() {
    const { initValue } = this.state;
    const { onChange } = this.props;

    this.setState({
      value: initValue
    });
  }

  _handleOnChange(value) {
    const { onChange, isfield } = this.props;

    if(!isfield) {
      this.setState({
        value
      }, () => {
        onChange(this.state.value);
      });
    } else {
      onChange(value);
    }
  }

  _handleIconClick() {
    if(this.props.disabled) {
      return;
    }

    this.datepickerRef.current.openCalendar();
  }

  getDateTimeComponent() {
    const { isfield, config, disabled, placeholder, value } = this.props;

    return (
      <Datetime
        { ...this.props }
        onChange={ this._handleOnChange }
        ref={ this.datepickerRef }
        value={ (isfield) ? value : this.state.value }
        inputProps={{
          placeholder: placeholder || '',
          disabled: disabled
        }}
        renderInput={ (inputProps) => {
          return (
            <div className="tyk-input-group">
              <input disabled={ this.props.disabled } { ...inputProps } className="tyk-form-control" />
              <span className="tyk-input-group__addon" onClick={ this._handleIconClick }>
                <Icon type="calendar" />
              </span>
            </div>
          );
        }}
      />
    );
  }

  getDateTimePickerError() {
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
          { this.getDateTimeComponent() }
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getDateTimePickerError() }
      </Fragment>
    );
  }
}
