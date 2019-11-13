import React from 'react';

/* eslint-disable react/prop-types */
const wrapper = Component => ({ field, form, ...properties }) => {
  const getValueFromPath = (obj, path) => {
    // turn 'aaa.qqq[2].bbb[5][3].mmm' into ['aaa', 'qqq', '2', 'bbb', '5', '3', 'mmm']
    const indexes = path.split('.').map(x => x.split('[')).flat().map(x => x.replace(/]/g, ''));
    return indexes.reduce((acc, v) => (acc ? acc[v] : acc), obj);
  };

  const onChange = (value) => {
    field.onChange({ target: { name: field.name, value } });
    if (typeof properties.onChange === 'function') properties.onChange(value);
  };

  const formError = getValueFromPath(form.touched, field.name)
    && getValueFromPath(form.errors, field.name);
  const error = typeof formError === 'string' ? formError : '';

  return <Component {...field} error={error} {...properties} isfield onChange={onChange} />;
};
/* eslint-enable react/prop-types */

export default wrapper;
