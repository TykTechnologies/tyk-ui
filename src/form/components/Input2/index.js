import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input2 = ({
  error,
  onChange,
  readOnly,
  id,
  inputgroupaddonleft,
  inputgroupaddonright,
  label,
  labelwidth,
  note,
  theme,
  value,
  wrapperClassName = '',
  ...rest
}, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const getAddon = content => (
    <div className="tyk-input-group__addon">
      { content }
    </div>
  );

  const getLabelStyles = () => ({
    ...labelwidth && {
      flexBasis: labelwidth,
    },
  });

  const getNonLabelWidth = () => ({
    ...labelwidth && {
      flexBasis: `calc(100% - ${labelwidth} - 20px)`,
    },
  });

  const getInputError = () => (
    (error && error !== 'true' && error !== 'false')
      ? (
        <p
          className="tyk-form-control__error-message"
        >
          { error }
        </p>
      )
      : null
  );

  const getCssClasses = () => {
    const cssClasses = [wrapperClassName, 'tyk-form-group'];
    const themes = theme ? theme.split(' ') : [];

    if (themes.length) {
      themes.forEach((iTheme) => {
        cssClasses.push(`tyk-form-group--${iTheme}`);
      });
    }

    if (inputgroupaddonleft) {
      cssClasses.push('tyk-form-group--addon-left');
    }

    if (inputgroupaddonright) {
      cssClasses.push('tyk-form-group--addon-right');
    }

    if (labelwidth) {
      cssClasses.push('tyk-form-group--label-has-width');
    }

    if (error) {
      cssClasses.push('has-error');
    }

    return cssClasses.join(' ');
  };

  const handleOnChange = (e) => {
    onChange(e, e.target.value);
  };

  const getInputElement = () => (
    <input
      autoComplete="off"
      className="tyk-form-control"
      {...rest}
      onChange={handleOnChange}
      value={value}
      ref={inputRef}
    />
  );

  const getInputGroupAddon = () => (
    <div className="tyk-input-group">
      {
        inputgroupaddonleft
          ? getAddon(inputgroupaddonleft)
          : null
      }
      { getInputElement() }
      {
        inputgroupaddonright
          ? getAddon(inputgroupaddonright)
          : null
      }
    </div>
  );

  return (
    <div className={getCssClasses()}>
      {
        label
          ? <label htmlFor={id} style={getLabelStyles()}>{ label }</label>
          : null
      }
      {!readOnly && (
        <div
          className="tyk-form-control__wrapper"
          style={getNonLabelWidth()}
        >
          {
            inputgroupaddonleft || inputgroupaddonright
              ? getInputGroupAddon()
              : getInputElement()
          }
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
          { getInputError() }
        </div>
      )}
      {
        readOnly && (
          <div className="tyk-form-control--readonly">
            {value || '-'}
          </div>
        )
      }
    </div>
  );
};

Input2.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  inputgroupaddonleft: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  inputgroupaddonright: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  labelwidth: PropTypes.string,
  name: PropTypes.string,
  note: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  wrapperClassName: PropTypes.string,
};

export default forwardRef(Input2);
