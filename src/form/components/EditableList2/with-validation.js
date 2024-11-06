import React, { useCallback, useState } from 'react';

/* eslint-disable-next-line react/display-name */
const withValidation = (Component) => ({
  onChange, // eslint-disable-line react/prop-types
  validate, // eslint-disable-line react/prop-types
  error, // eslint-disable-line react/prop-types
  ...rest
}) => {
  const [internalError, setInternalError] = useState(null);
  const onFieldChange = useCallback((event) => {
    const value = event?.target
      ? ['radio', 'checkbox'].includes(event.target.type)
        ? event.target.checked
        : event?.target.value
      : event;

    let isValid = true;
    if (validate && typeof validate === 'function') {
      const errorMsg = validate(value);
      isValid = !errorMsg;
      setInternalError(errorMsg);
    }

    onChange(value, isValid);
  }, [validate, onChange]);

  return <Component {...rest} onChange={onFieldChange} error={internalError || error} />;
};

export default withValidation;
