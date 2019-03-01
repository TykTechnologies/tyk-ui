import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    isfield: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    inputGroupAddonLeft: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    inputGroupAddonRight: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static getAddon(content) {
    return (
      <div className="tyk-input-group__addon">
        { content }
      </div>
    );
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
  }

  getInputError() {
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

  getInputGroupAddon() {
    const {
      inputGroupAddonLeft,
      inputGroupAddonRight,
    } = this.props;

    return (
      <div className="tyk-input-group">
        {
          inputGroupAddonLeft
            ? Input.getAddon(inputGroupAddonLeft)
            : null
        }
        { this.getInputComponent() }
        {
          inputGroupAddonRight
            ? Input.getAddon(inputGroupAddonRight)
            : null
        }
      </div>
    );
  }

  getInputComponent() {
    const {
      isfield, onChange, value, ...rest
    } = this.props;
    const { stateValue } = this.state;
    return (
      <input
        autoComplete="off"
        className="tyk-form-control"
        {...rest}
        onChange={this.handleOnChange}
        value={(isfield) ? value : stateValue}
      />
    );
  }

  reset() {
    const { initValue } = this.state;

    this.setState({
      stateValue: initValue,
    });
  }

  handleOnChange(e) {
    const { onChange, isfield } = this.props;
    const {
      stateValue,
    } = this.state;

    if (!isfield) {
      this.setState({
        stateValue: e.target.value,
      }, () => {
        onChange(stateValue);
      });
    } else {
      onChange(e.target.value);
    }
  }

  render() {
    const {
      label,
      id,
      inputGroupAddonLeft,
      inputGroupAddonRight,
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
          {
            inputGroupAddonLeft || inputGroupAddonRight
              ? this.getInputGroupAddon()
              : this.getInputComponent()
          }
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
        </div>
        { this.getInputError() }
      </Fragment>
    );
  }
}
