import React, { useState, useEffect } from 'react';

function getValueFromPath(obj, path) {
  // turn 'aaa.qqq[2].bbb[5][3].mmm' into ['aaa', 'qqq', '2', 'bbb', '5', '3', 'mmm']
  const indexes = path.split(/[\][.]/).filter(x => Boolean(x));
  return indexes.reduce((acc, v) => (acc ? acc[v] : acc), obj);
}

function debounce(f, limit) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(f, limit, ...args);
  };
}

const executeDebounced = debounce(fn => fn(), 200);

/* eslint-disable react/prop-types */
const wrapper = (Component, options) => ({ field, form, ...properties }) => {
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

  return (
    <Component
      {...field}
      error={error}
      isfield="true"
      {...properties}
      checked={typeof properties.value === 'string' ? field.value === properties.value : field.value}
      onChange={onChange}
      value={myValue}
      input={{ value: myValue, onChange }}
    />
  );
};

export default wrapper;
