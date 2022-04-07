import React, { useState, useEffect } from 'react';

function getValueFromPath(obj, path) {
  // turn 'aaa.qqq[2].bbb[5][3].mmm' into ['aaa', 'qqq', '2', 'bbb', '5', '3', 'mmm']
  const indexes = path.split(/[\][.]/).filter(x => Boolean(x));
  return indexes.reduce((acc, v) => (acc ? acc[v] : acc), obj);
}

function debounce(f, limit) {
  // something new
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(f, limit, ...args);
  };
}

/* eslint-disable react/prop-types */
/**
 * A wrapper function that "prepares" a tyk-ui form component to be used with the formik library.
 * It handles things like setting the value of the component, change events, error state,
 * and also has a default debounce time for when the change event is triggered.
 */
const wrapper = (Component, options) => ({ field, form, ...properties }) => {
  const DEFAULT_DEBOUNCE_TIME_MS = 200;
  const [executeDebounced] = useState(() => {
    if (properties.debounce === false) return fn => fn();
    const timeout = typeof properties.debounce === 'number'
      ? properties.debounce
      : DEFAULT_DEBOUNCE_TIME_MS;
    return debounce(fn => fn(), timeout);
  });
  const [myValue, setMyValue] = useState(field.value);
  const opts = {
    ...{
      getOnChangeProps: () => ({}),
    },
    ...options,
  };

  const getValue = (v) => {
    if (v && v.target) {
      if (v.target.nodeName === 'INPUT' && (v.target.type === 'checkbox' || v.target.type === 'radio')) {
        return v.target.checked;
      }
      return v.target.value;
    }
    return v;
  };

  const onChange = (valueOrEvent) => {
    const value = getValue(valueOrEvent);
    const onChangeProps = opts.getOnChangeProps(value, field, form, properties);

    const newValue = onChangeProps.value || properties.value || value;
    executeDebounced(() => {
      if (typeof properties.onChange === 'function') {
        properties.onChange(newValue);
      }
      field.onChange({ target: { name: field.name, value: newValue, ...onChangeProps } });
    });
    setMyValue(newValue);
  };

  const formError = (getValueFromPath(form.touched, field.name) || Boolean(form.submitCount))
    && getValueFromPath(form.errors, field.name);
  const error = typeof formError === 'string' ? formError : '';

  useEffect(() => {
    setMyValue(field.value);
  }, [field.value]);

  // eslint-disable-next-line no-param-reassign
  if (form.status?.disabled) properties.disabled = true;

  return (
    <Component
      {...field}
      error={error}
      isfield
      {...properties}
      checked={typeof properties.value === 'string' ? field.value === properties.value : field.value}
      onChange={onChange}
      value={myValue}
      input={{ value: myValue, onChange }}
    />
  );
};

export default wrapper;
