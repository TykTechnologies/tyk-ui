import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Select(props) {
  const {
    value,
    onChange,
    onBlur,
    isfield,
    label,
    labelwidth,
    id,
    note,
    readOnly,
    options,
    error,
    theme,
    wrapperClassName = '',
    ...rest
  } = props;
  const [stateValue, setStateValue] = useState(value);

  useEffect(() => {
    if (!isfield && stateValue !== value) {
      setStateValue(value);
      if (onChange) onChange(value);
    }
  }, [stateValue, value]);

  const handleOnChange = useCallback((e) => {
    const selectedValue = options.find((option) => option.id === e.target.value);

    if (!isfield) {
      setStateValue(selectedValue);
    }
    onChange(selectedValue.id ? selectedValue : null);
  }, [options, isfield, onChange]);

  const handleOnBlur = useCallback(() => {
    if (onBlur) {
      onBlur(value);
    }
  }, [onBlur]);

  const getSelectError = useCallback(() => {
    return (error && error !== 'true' && error !== 'false')
      ? (
        <p className="tyk-form-control__error-message">
          { error }
        </p>
      )
      : null;
  }, [error]);

  const getCssClasses = useCallback(
    () => [
      'tyk-form-group',
      wrapperClassName,
      ...(theme ? theme.split(' ').map((t) => `tyk-form-group--${t}`) : []),
      labelwidth && 'tyk-form-group--label-has-width',
      error && 'has-error',
    ].filter(Boolean).join(' '),
    [wrapperClassName, theme, labelwidth, error],
  );

  const getLabelStyles = useCallback(() => {
    if (labelwidth) return { flexBasis: labelwidth };
    return {};
  }, [labelwidth]);

  const getNonLabelWidth = useCallback(() => {
    if (labelwidth) return { flexBasis: `calc(100% - ${labelwidth} - 20px)` };
    return {};
  }, [labelwidth]);

  const getSelectComponent = useCallback(() => {
    const selectValue = isfield && value ? value : stateValue;

    return (
      <select
        className="tyk-form-control tyk-select"
        {...rest}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={selectValue ? selectValue.id : ''}
      >
        {
          options.map((option) => (
            <option key={option.id} value={option.id}>
              { option.name }
            </option>
          ))
        }
      </select>
    );
  }, [isfield, value, stateValue, handleOnChange, handleOnBlur, options, rest]);

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
          { getSelectComponent() }
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
          { getSelectError() }
        </div>
      )}
      {readOnly && <div className="tyk-form-control--readonly">{value || '-'}</div>}
    </div>
  );
}

Select.propTypes = {
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  id: PropTypes.string,
  isfield: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  options: PropTypes.instanceOf(Array),
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
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  wrapperClassName: PropTypes.string,
};

export default Select;
