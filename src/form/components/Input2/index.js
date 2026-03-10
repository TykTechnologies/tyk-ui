import React, {
  useImperativeHandle, useRef, useState, forwardRef,
} from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import './Input2.css';

const Input2 = forwardRef(function Input2({
  error,
  onChange,
  readOnly,
  id,
  inputgroupaddonleft,
  inputgroupaddonright,
  label,
  labelwidth,
  note,
  value,
  type,
  wrapperClassName = '',
  ...rest
}, ref) {
  const inputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  const getAddon = (content) => (
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
    const cssClasses = [wrapperClassName, 'tyk-form-group', 'tyk-form-group--default'];

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

  const resolvedType = (type === 'password' && showPassword) ? 'text' : type;

  const getInputElement = () => (
    <input
      autoComplete="off"
      className="tyk-form-control"
      {...rest}
      type={resolvedType}
      onChange={handleOnChange}
      value={value}
      ref={inputRef}
    />
  );

  const getInputComponent = () => {
    const inputEl = getInputElement();

    if (type === 'password') {
      return (
        <div className="tyk-form-control__password-wrapper">
          { inputEl }
          <button
            type="button"
            className="tyk-form-control__password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            disabled={rest.disabled}
          >
            <Icon type={showPassword ? 'eye-slash' : 'eye'} />
          </button>
        </div>
      );
    }

    return inputEl;
  };

  const getInputGroupAddon = () => (
    <div className="tyk-input-group">
      {
        inputgroupaddonleft
          ? getAddon(inputgroupaddonleft)
          : null
      }
      { getInputComponent() }
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
              : getInputComponent()
          }
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
          { getInputError() }
        </div>
      )}
      {readOnly && (
        type === 'password' ? (
          <div className="tyk-form-control--readonly tyk-form-control--password-readonly">
            <span>
              {showPassword ? (value || '-') : (value ? '•'.repeat(String(value).length) : '-')}
            </span>
            {value && (
              <button
                type="button"
                className="tyk-form-control__password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon type={showPassword ? 'eye-slash' : 'eye'} />
              </button>
            )}
          </div>
        ) : (
          <div className="tyk-form-control--readonly">
            {value || '-'}
          </div>
        )
      )}
    </div>
  );
});

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
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  wrapperClassName: PropTypes.string,
};

export default Input2;
