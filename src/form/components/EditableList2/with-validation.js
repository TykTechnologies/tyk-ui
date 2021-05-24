import React, { useCallback, useState } from 'react';

const withValidation = Component => ({
  onChange,
  validate,
  error,
  ...rest
}) => {
  const [internalError, setInternalError] = useState(null);
  const onFieldChange = useCallback((event) => {
    /* eslint-disable-next-line */
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
