import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'brace';
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
    labelWidth: PropTypes.string,
    mode: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    theme: PropTypes.string,
    value: PropTypes.string,
  }

  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
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

  handleOnChange(value) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  }

  handleOnBlur() {
    const { value, onBlur } = this.props;

    if (onBlur) {
      onBlur(value);
    }
  }

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
          <div className="tyk-form-control__wrapper" style={this.getNonLabelWidth()}>
            <AceEditor
              className="tyk-form-control"
              {...this.props}
              onChange={this.handleOnChange}
              onBlur={this.handleOnBlur}
              theme="github"
              editorProps={{ $blockScrolling: true }}
            />
            {
              note
                ? <p className="tyk-form-control__help-block">{ note }</p>
                : null
            }
            { this.getCodeEditorError() }
          </div>
        </div>
      </Fragment>
    );
  }
}
