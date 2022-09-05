import React from 'react';
import PropTypes from 'prop-types';
import * as monaco from 'monaco-editor';
import Editor, { loader } from '@monaco-editor/react';

loader.config({ monaco });

const MonacoCodeEditor = ({
  error,
  disabled,
  theme,
  label,
  labelwidth,
  readOnly,
  id,
  onChange,
  onBlur,
  value,
  wrapperClassName = '',
  note,
  ...restProps
}) => {

  const getCodeEditorError = () => (error && error !== 'true' && error !== 'false')
    ? (
      <p
        className="tyk-form-control__error-message"
      >
        { error }
      </p>
    )
    : null;

  const getCssClasses = () =>  {
    const cssClasses = [wrapperClassName, 'tyk-form-group'];
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
  };

  const getLabelStyles = () => {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = labelwidth;
    }

    return styles;
  };

  const getNonLabelWidth = () => {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styles;
  };

  const handleOnChange = (value) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleOnBlur = () => {
    if (onBlur) {
      onBlur(value);
    }
  };

  return <>
    <div className={getCssClasses()}>
      {
        label
          ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
          : null
      }
      <div className="tyk-form-control__wrapper monaco-code-editor" style={getNonLabelWidth()}>
        <Editor
          className="tyk-form-control"
          width="100%"
          height="300px"
          defaultLanguage="json"
          {...restProps}
          defaultValue={value}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          options={{
            readOnly: readOnly || disabled,
            ...(restProps?.options || {})
          }}
        />
        {
          note
            ? <p className="tyk-form-control__help-block">{ note }</p>
            : null
        }
        {getCodeEditorError() }
      </div>
    </div>
  </>
};

MonacoCodeEditor.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
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
    PropTypes.string,
  ]),
  labelwidth: PropTypes.string,
  name: PropTypes.string,
  note: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  theme: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

export default MonacoCodeEditor;
