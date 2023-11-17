import React, { useCallback } from 'react';
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

function CodeEditor(props) {
  const {
    disabled,
    readOnly,
    disableValidation,
    id,
    error,
    label,
    labelwidth,
    note,
    onBlur,
    onChange,
    theme,
    value,
    setOptions,
    wrapperClassName,
  } = props;
  const classes = [
    'tyk-form-group',
    wrapperClassName,
    ...(theme ? theme.split(' ').map((t) => `tyk-form-group--${t}`) : []),
    labelwidth && 'tyk-form-group--label-has-width',
    error && 'has-error',
  ].filter(Boolean).join(' ');

  const finalSetOptions = {
    ...setOptions,
    ...disableValidation && { useWorker: false },
  };

  const getCodeEditorError = useCallback(() => (
    error && error !== 'true' && error !== 'false'
      ? (
        <p className="tyk-form-control__error-message">
          {error}
        </p>
      )
      : null
  ), [error]);

  const getLabelStyles = useCallback(() => {
    if (labelwidth) return { flexBasis: labelwidth };
    return {};
  }, [labelwidth]);

  const getNonLabelWidth = useCallback(() => {
    if (labelwidth) return { flexBasis: `calc(100% - ${labelwidth} - 20px)` };
    return {};
  }, [labelwidth]);

  const handleOnChange = useCallback((newValue) => {
    if (onChange) onChange(newValue);
  }, [onChange]);

  const handleOnBlur = useCallback(() => {
    if (onBlur) onBlur(value);
  }, [onBlur, value]);

  return (
    <div className={classes}>
      {
        label
          ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
          : null
      }
      <div className="tyk-form-control__wrapper" style={getNonLabelWidth()}>
        <AceEditor
          className="tyk-form-control"
          {...props}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          theme="github"
          editorProps={{ $blockScrolling: true }}
          readOnly={readOnly || disabled}
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
        { getCodeEditorError() }
      </div>
    </div>
  );
}

CodeEditor.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
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
    PropTypes.string,
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
  wrapperClassName: PropTypes.string,
};

export default CodeEditor;
