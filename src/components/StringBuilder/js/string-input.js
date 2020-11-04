import React from 'react';

import PropTypes from 'prop-types';

const StringInput = ({
  // setShowOptions,
  tokenValue,
  handleInputChange,
  handleKeyDown,
  disabled,
  placeholder,
  inputRef,
}) => {
  const autoGrow = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
  };

  return (
    <textarea
      disabled={disabled}
      className="string-builder__input"
      value={tokenValue}
      onChange={handleInputChange}
      // onFocus={() => setShowOptions(true)}
      // onBlur={() => setShowOptions(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={autoGrow}
      placeholder={placeholder}
      onPaste={e => console.log('PASTE >>>>', { e }, e.target)}
      ref={inputRef}
    />
  );
};

StringInput.propTypes = {
  // setShowOptions: PropTypes.func,
  tokenValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  inputRef: PropTypes.element,
};

export { StringInput };
