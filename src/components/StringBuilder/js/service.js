/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS
export const stringToTokenString = (value, options) => {
  let tempStr = value;
  options.forEach((option) => {
    // debugger;
    tempStr = tempStr.replaceAll(option.id, `__TOKEN__${option.id}__TOKEN__`);
  });
  return tempStr;
};
