import React from 'react';
import PropTypes from 'prop-types';

function Textarea({
  id,
  input,
  label,
  note,
  error,
  theme,
  labelwidth,
  value,
  readOnly,
  wrapperClassName,
  ...rest
}) {
  const classes = [
    'tyk-form-group',
    wrapperClassName,
    ...(theme ? theme.split(' ').map((t) => `tyk-form-group--${t}`) : []),
    labelwidth && 'tyk-form-group--label-has-width',
    error && 'has-error',
  ].filter(Boolean).join(' ');

  const getLabelStyles = () => {
    if (labelwidth) return { flexBasis: labelwidth };
    return {};
  };

  const getNonLabelWidth = () => {
    if (labelwidth) return { flexBasis: `calc(100% - ${labelwidth} - 20px)` };
    return {};
  };

  function getTextareaError() {
    return (error && error !== 'true' && error !== 'false')
      ? (
        <p className="tyk-form-control__error-message">
          { error }
        </p>
      )
      : null;
  }

  return (
    <div className={classes}>
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
          <textarea
            className="tyk-form-control"
            {...rest}
            {...input}
          >
            { value }
          </textarea>
          {
            note
              ? <p className="tyk-form-control__help-block">{ note }</p>
              : null
          }
          {getTextareaError()}
        </div>
      )}
      {readOnly && <div className="tyk-form-control--readonly">{value || '-'}</div>}
    </div>
  );
}

Textarea.propTypes = {
  /** Disable the component */
  disabled: PropTypes.bool,
  /** Displays only the text value of the component, or "-" if no value is set */
  readOnly: PropTypes.bool,
  input: PropTypes.instanceOf(Object),
  /** Set an error message for the component and the component is rendered in the error state */
  error: PropTypes.string,
  /** Adds a label to the component */
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  /** Sets the width of the label */
  labelwidth: PropTypes.string,
  /** Set a name for the component */
  name: PropTypes.string,
  /** Adds additional information under the component */
  note: PropTypes.string,
  /** Callback function executed on value change */
  onChange: PropTypes.func,
  id: PropTypes.string,
  /** Set a theme for the component */
  theme: PropTypes.string,
  /** Set the value of the component */
  value: PropTypes.string,
  /** CSS classes added to the wrapper of the component */
  wrapperClassName: PropTypes.string,
};

export default Textarea;
