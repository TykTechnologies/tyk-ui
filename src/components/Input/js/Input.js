import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    inputGroupAddonLeft: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    inputGroupAddonRight: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  state = {
    initValue: this.props.value,
    value: this.props.value
  };

  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
  }

  reset() {
    const { initValue } = this.state;
    const { onChange } = this.props;

    this.setState({
      value: initValue
    });
  }

  _handleOnChange(e) {
    const { onChange, isfield } = this.props;


    if(!isfield) {
      this.setState({
        value: e.target.value
      }, () => {
        onChange(this.state.value);
      });
    } else {
      onChange(e.target.value);
    }
  }

  getAddon(content) {
    return(
      <div className="tyk-input-group__addon">
        { content }
      </div>
    );
  }

  getInputGroupAddon() {
    return (
      <div className="tyk-input-group">
        {
          this.props.inputGroupAddonLeft
            ? this.getAddon(this.props.inputGroupAddonLeft)
            : null
        }
        { this.getInputComponent() }
        {
          this.props.inputGroupAddonRight
            ? this.getAddon(this.props.inputGroupAddonRight)
            : null
        }
      </div>
    );
  }

  getInputComponent() {
    const { isfield, onChange, ...rest } = this.props;

    return (
      <input
        autoComplete="off"
        className="tyk-form-control"
        { ...rest }
        onChange={ this._handleOnChange }
        value={ (isfield) ? this.props.value : this.state.value }
      />
    );
  }

  getInputError() {
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
            this.props.inputGroupAddonLeft || this.props.inputGroupAddonRight
              ? this.getInputGroupAddon()
              : this.getInputComponent()
          }
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getInputError() }
      </Fragment>
    );
  }
}
