import React, { useCallback, useEffect, useState } from 'react';

import config from '../config/config';

function getValueFromPath(obj, path) {
  // turn 'aaa.qqq[2].bbb[5][3].mmm' into ['aaa', 'qqq', '2', 'bbb', '5', '3', 'mmm']
  const indexes = path.split(/[\][.]/).filter(Boolean);
  return indexes.reduce((acc, v) => (acc ? acc[v] : acc), obj);
}

function debounce(f, limit) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(f, limit, ...args);
  };
}

/* eslint-disable react/prop-types, react/display-name */
/**
 * A wrapper function that "prepares" a tyk-ui form component to be used with the formik library.
 * It handles things like setting the value of the component, change events, error state,
 * and also has a default debounce time for when the change event is triggered.
 */
const wrapper = (Component, options) => ({ field, form, ...properties }) => {
  const DEFAULT_DEBOUNCE_TIME_MS = typeof config.FORM_DEBOUNCE === 'number' ? config.FORM_DEBOUNCE : 200;
  const [myValue, setMyValue] = useState(field.value);
  const opts = {
    getOnChangeProps: () => ({}),
    hasIsFieldProp: false,
    ...options,
  };

  const executeDebounced = useCallback((() => {
    const fn = (f) => f();
    if (
      properties.debounce === false
      || (config.FORM_DEBOUNCE === false && !properties.debounce)
    ) {
      return fn;
    }
    const timeout = typeof properties.debounce === 'number'
      ? properties.debounce
      : DEFAULT_DEBOUNCE_TIME_MS;
    return debounce(fn, timeout);
  })(), []);

  const getValue = (v) => {
    if (v?.target) {
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
      if (form.validateOnBlur && Component.name === 'Combobox2') setTimeout(() => form.setFieldTouched(field.name));
    });
    setMyValue(newValue);
  };

  const formError = (getValueFromPath(form.touched, field.name) || Boolean(form.submitCount))
    && getValueFromPath(form.errors, field.name);
  const error = typeof formError === 'string' ? formError : '';

  useEffect(() => {
    setMyValue(field.value);
  }, [field.value]);

  if (form.status?.disabled) properties.disabled = true;

  const componentProps = { ...properties };
  delete componentProps.debounce;

  if (Object.hasOwn(componentProps, 'className') && componentProps.className === undefined) delete componentProps.className;
  if (Object.hasOwn(componentProps, 'children') && componentProps.children === undefined) delete componentProps.children;

  if (Component.name === 'Combobox2') {
    delete field.onBlur;
  }

  return (
    <Component
      {...field}
      error={error}
      {...(opts.hasIsFieldProp ? { isfield: true } : {})}
      {...componentProps}
      checked={typeof properties.value === 'string' ? field.value === properties.value : field.value}
      onChange={onChange}
      value={myValue}
      input={{ value: myValue, onChange }}
    />
  );
};

export default wrapper;
