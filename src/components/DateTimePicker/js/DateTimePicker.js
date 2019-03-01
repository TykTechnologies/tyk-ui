import React, { Component, Fragment, createRef } from 'react';
import Datetime from 'react-datetime';
import PropTypes from 'prop-types';

import Icon from '../../Icon';

export default class DateTimePicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    isfield: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.instanceOf(Date),
  }

  constructor(props) {
    super(props);
    const {
      value,
    } = this.props;

    this.state = {
      initValue: value,
      stateValue: value,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
    this.datepickerRef = createRef();
  }

  getDateTimeComponent() {
    const {
      isfield,
      disabled,
      placeholder,
      value,
    } = this.props;
    const {
      stateValue,
    } = this.state;

    return (
      <Datetime
        {...this.props}
        onChange={this.handleOnChange}
        ref={this.datepickerRef}
        value={(isfield) ? value : stateValue}
        inputProps={{
          placeholder: placeholder || '',
          disabled,
        }}
        renderInput={inputProps => (
          <div className="tyk-input-group">
            <input disabled={disabled} {...inputProps} className="tyk-form-control" />
            <button
              className="tyk-input-group__addon"
              onClick={this.handleIconClick}
              type="button"
            >
              <Icon type="calendar" />
            </button>
          </div>
        )}
      />
    );
  }

  getDateTimePickerError() {
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

  getCssClasses() {
    const { error } = this.props;
    const cssClasses = ['tyk-form-group'];

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  }

  handleOnChange(value) {
    const { onChange, isfield } = this.props;

    if (!isfield) {
      this.setState({
        stateValue: value,
      }, () => {
        const {
          stateValue,
        } = this.state;
        onChange(stateValue);
      });
    } else {
      onChange(value);
    }
  }

  handleIconClick() {
    const {
      disabled,
    } = this.props;

    if (disabled) {
      return;
    }

    this.datepickerRef.current.openCalendar();
  }

  reset() {
    const { initValue } = this.state;

    this.setState({
      stateValue: initValue,
    });
  }

  render() {
    const {
      label,
      id,
      note,
    } = this.props;

    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          {
            label
              ? <label htmlFor={id}>{ label }</label>
              : null
          }
          { this.getDateTimeComponent() }
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
        </div>
        { this.getDateTimePickerError() }
      </Fragment>
    );
  }
}
