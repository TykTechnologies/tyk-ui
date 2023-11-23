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
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  input: PropTypes.instanceOf(Object),
  error: PropTypes.string,
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
  id: PropTypes.string,
  theme: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

export default Textarea;
