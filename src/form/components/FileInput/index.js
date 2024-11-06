import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';

function FileInput({
  error,
  theme,
  labelwidth,
  wrapperClassName = '',
  id,
  label,
  note,
  accept,
  onChange,
  ...rest
}) {
  const fileInputRef = useRef();

  function handleOnChange(e) {
    onChange(e.target.files);
  }

  function getCssClasses() {
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
  }

  function getLabelStyles() {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = labelwidth;
    }

    return styles;
  }

  function getNonLabelWidth() {
    const styles = {};

    if (labelwidth) {
      styles.flexBasis = `calc(100% - ${labelwidth} - 20px)`;
    }

    return styles;
  }

  function getFileInputError() {
    return (error && error !== 'true' && error !== 'false')
      ? (
        <p className="tyk-form-control__error-message">
          { error }
        </p>
      )
      : null;
  }

  function getFileInputComponent() {
    return (
      <div
        className="tyk-file-input__wrapper"
        style={getNonLabelWidth()}
      >
        <input
          accept={accept}
          className="tyk-form-control"
          {...rest}
          onChange={handleOnChange}
          ref={fileInputRef}
          type="file"
        />
        {
          fileInputRef.current && fileInputRef.current.files.length > 0
            ? (
              <button
                onClick={clearValue}
                type="button"
                aria-label="clear value"
              >
                <Icon type="xmark" />
              </button>
            )
            : null
        }
      </div>
    );
  }

  function clearValue() {
    fileInputRef.current.value = '';
    onChange('');
  }

  return (
    <div className={getCssClasses()}>
      {
        label
          ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
          : null
      }
      <div className="tyk-form-control__wrapper">
        { getFileInputComponent() }
        {
          note
            ? <p className="tyk-form-control__help-block">{ note }</p>
            : null
        }
      </div>
      { getFileInputError() }
    </div>
  );
}

FileInput.propTypes = {
  accept: PropTypes.string,
  disabled: PropTypes.bool,
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.instanceOf(Object),
  wrapperClassName: PropTypes.string,
};

export default FileInput;
