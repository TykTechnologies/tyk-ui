import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../../components/Icon';
import MaskSecret from '../../../components/MaskSecret';
import Input2 from '../Input2';
import './MaskedInput.css';

function MaskedInput({
  type,
  readOnly,
  value,
  label,
  id,
  labelwidth,
  note,
  error,
  wrapperClassName,
  onChange,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (type !== 'password') {
    return (
      <Input2
        type={type}
        readOnly={readOnly}
        value={value}
        label={label}
        id={id}
        labelwidth={labelwidth}
        note={note}
        error={error}
        wrapperClassName={wrapperClassName}
        onChange={onChange}
        {...rest}
      />
    );
  }

  if (readOnly) {
    const cssClasses = [
      wrapperClassName,
      'tyk-form-group',
      'tyk-form-group--default',
      labelwidth && 'tyk-form-group--label-has-width',
    ].filter(Boolean).join(' ');

    const labelStyle = labelwidth ? { flexBasis: labelwidth } : {};

    return (
      <div className={cssClasses}>
        {label && <label htmlFor={id} style={labelStyle}>{ label }</label>}
        <div className="tyk-form-control--readonly">
          <MaskSecret value={value} />
        </div>
      </div>
    );
  }

  const toggle = (
    <button
      type="button"
      className="tyk-masked-input__toggle"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
      disabled={rest.disabled}
    >
      <Icon type={showPassword ? 'eye-slash' : 'eye'} />
    </button>
  );

  return (
    <Input2
      label={label}
      id={id}
      labelwidth={labelwidth}
      note={note}
      error={error}
      wrapperClassName={wrapperClassName}
      onChange={onChange}
      {...rest}
      type={showPassword ? 'text' : 'password'}
      value={value}
      inputgroupaddonright={toggle}
    />
  );
}

MaskedInput.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
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

export default MaskedInput;
