import React from 'react';
import PropTypes from 'prop-types';

/**
 * Radio can be used when a user needs to select at most one value from a multiple options.
 */
function Radio({
  label,
  input,
  note,
  inline,
  nospace,
  theme = '',
  disabled,
  readOnly,
  wrapperClassName = '',
  ...rest
}) {
  const cssClasses = [
    inline ? 'tyk-radio--inline' : 'tyk-radio',
    wrapperClassName,
    nospace && 'no-margin',
    ...(theme ? theme.split(' ').filter(Boolean).map((t) => `tyk-radio--theme-${t}`) : []),
    (readOnly || disabled) && 'tyk-radio--is-disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className={cssClasses}>
      <label>
        <input
          {...input}
          {...rest}
          type="radio"
          disabled={readOnly || disabled}
        />
        {label}
      </label>
      {note && (
        <p className="tyk-form-control__help-block">{note}</p>
      )}
    </div>
  );
}

Radio.propTypes = {
  /** Used to disable the element */
  disabled: PropTypes.bool,
  /** Readonly prop behaves the same as disabled on radio elements */
  readOnly: PropTypes.bool,
  /** Align radio in the same line with other elements */
  inline: PropTypes.bool,
  /** Set a theme for radio */
  theme: PropTypes.string,
  input: PropTypes.instanceOf(Object),
  /** Adds label to the radio input */
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  /** Set name for the radio input */
  name: PropTypes.string,
  /** If set to true removes margin by adding `no-margin` class */
  nospace: PropTypes.bool,
  /** Set initial value for the radio input */
  value: PropTypes.string,
  /** Add note at the bottom of the radio input */
  note: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.node,
  ]),
  wrapperClassName: PropTypes.string,
};

export default Radio;
