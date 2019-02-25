import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/css';
import 'brace/mode/json';
import 'brace/mode/xml';
import 'brace/mode/jsx';
import 'brace/ext/searchbox';
import 'brace/ext/beautify';
import 'brace/theme/github';

export default class CodeEditor extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    id: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    label: PropTypes.string,
    mode: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this._handleOnChange = this._handleOnChange.bind(this);
    this._handleOnBlur = this._handleOnBlur.bind(this);
  }

  _handleOnChange(value) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  getCodeEditorError() {
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

  _handleOnBlur() {
    const { value, onBlur } = this.props;

    if (onBlur) {
      onBlur(value);
    }
  }

  render() {
    return (
      <Fragment>
        <div className={this.getCssClasses()}>
          {
            this.props.label
              ? <label htmlFor={this.props.id}>{ this.props.label }</label>
              : null
          }
          <AceEditor
            className="tyk-form-control"
            {...this.props}
            onChange={this._handleOnChange}
            onBlur={this._handleOnBlur}
            theme="github"
            editorProps={{ $blockScrolling: true }}
          />
          {
            this.props.note
              ? <p className="tyk-form-control__help-block">{ this.props.note }</p>
              : null
          }
        </div>
        { this.getCodeEditorError() }
      </Fragment>
    );
  }
}
