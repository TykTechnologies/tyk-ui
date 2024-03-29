export const stringToTokenString = (value, options) => {
  let tempStr = value;
  options.forEach((option) => {
    tempStr = tempStr.replaceAll(option.id, `__TOKEN__${option.id}__TOKEN__`);
  });
  return tempStr;
};


export const setCursorPos = (ref, pos) => {
  setTimeout(() => {
    ref.current.setSelectionRange(pos, pos);
  }, 20);
};
