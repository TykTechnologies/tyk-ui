import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/mode/golang';
import 'brace/mode/python';
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
    disableValidation: PropTypes.bool,
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
    ]),
    labelwidth: PropTypes.string,
    mode: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    theme: PropTypes.string,
    value: PropTypes.string,
    setOptions: PropTypes.instanceOf(Object),
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
      disableValidation = false,
      setOptions = null,
    } = this.props;

    const finalSetOptions = {
      ...setOptions,
      ...disableValidation && { useWorker: false },
    };

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
              onLoad={(editorInstance) => {
                // eslint-disable-next-line
                editorInstance.container.style.resize = 'both';
                // mouseup = css resize end
                document.addEventListener('mouseup', () => (
                  editorInstance.resize()
                ));
              }}
              setOptions={finalSetOptions}
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
