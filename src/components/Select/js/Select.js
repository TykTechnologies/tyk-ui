import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    options: PropTypes.array,
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  }

  state = {
    initValue: this.props.value,
    value: this.props.value
  };

  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnBlur = this._handleOnBlur.bind(this);
  }

  reset() {
    const { initValue } = this.state;
    const { onChange } = this.props;

    this.setState({
      value: initValue
    });
  }

  _handleOnChange(e) {
    const { onChange, isfield, options } = this.props;
    let selectedValue = null;

    selectedValue = options.filter((option) => {
      return option.id === e.target.value;
    })[0];

    if(!isfield) {
      this.setState({
        value: selectedValue
      }, () => {
        onChange(this.state.value.id ? this.state.value : null);
      });
    } else {
      onChange(selectedValue.id ? selectedValue : null);
    }
  }

  _handleOnBlur() {
    const { value, onBlur } = this.props;

    onBlur && onBlur(value);
  }

  getSelectComponent() {
    const { isfield, options, onChange, onBlur, ...rest } = this.props;
    let value = '';

    if(isfield && this.props.value) {
      value = this.props.value;
    } else if(this.state.value) {
      value = this.state.value;
    }

    return (
      <select
        className="tyk-form-control tyk-select"
        { ...rest }
        onChange={ this._handleOnChange }
        onBlur={ this._handleOnBlur }
        value={ value ? value.id : '' }
      >
        {
          options.map((option) => {
            return <option key={ option.id } value={ option.id }>{ option.name }</option>;
          })
        }
      </select>
    );
  }

  getSelectError() {
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
          {
            this.getSelectComponent()
          }
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getSelectError() }
      </Fragment>
    );
  }
}
