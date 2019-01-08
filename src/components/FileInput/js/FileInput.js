import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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

  getFileInputComponent() {
    const { accept, isfield, onChange, ...rest } = this.props;

    return (
      <input
        accept={ accept }
        className="tyk-form-control"
        { ...rest }
        onChange={ this._handleOnChange }
        value={ (isfield) ? this.props.value : this.state.value }
        type="file"
      />
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
