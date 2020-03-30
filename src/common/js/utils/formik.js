import React from 'react';

const getValueFromPath = (obj, path) => {
  // turn 'aaa.qqq[2].bbb[5][3].mmm' into ['aaa', 'qqq', '2', 'bbb', '5', '3', 'mmm']
  const indexes = path.split(/[\][.]/).filter(x => Boolean(x));
  return indexes.reduce((acc, v) => (acc ? acc[v] : acc), obj);
};

/* eslint-disable react/prop-types */
const wrapper = (Component, options) => ({ field, form, ...properties }) => {
  const opts = {
    ...{
      getOnChangeProps: () => ({}),
    },
    ...options,
  };

  const onChange = (valueOrEvent) => {
    const getValue = (v) => {
      if (v && v.target) {
        if (v.target.nodeName === 'INPUT' && (v.target.type === 'checkbox' || v.target.type === 'radio')) {
          return v.target.checked;
        }
        return v.target.value;
      }
      return v;
    };
    const value = getValue(valueOrEvent);
    const onChangeProps = opts.getOnChangeProps(value, field, form, properties);
    field.onChange({ target: { name: field.name, value, ...onChangeProps } });
    if (typeof properties.onChange === 'function') properties.onChange(onChangeProps.value || properties.value || value);
  };

  const formError = (getValueFromPath(form.touched, field.name) || Boolean(form.submitCount))
    && getValueFromPath(form.errors, field.name);
  const error = typeof formError === 'string' ? formError : '';
  return (
    <Component
      {...field}
      error={error}
      isfield="true"
      {...properties}
      checked={typeof properties.value === 'string' ? field.value === properties.value : field.value}
      onChange={onChange}
      input={{ value: field.value, onChange }}
    />
  );
};

export default wrapper;
