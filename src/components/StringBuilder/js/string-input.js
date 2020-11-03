import React from 'react';

import PropTypes from 'prop-types';


const StringInput = ({
  setShowOptions,
  tokenValue,
  handleInputChange,
  handleKeyDown,
  disabled,
  placeholder,
}) => (
  <input
    disabled={disabled}
    className="string-builder__input"
    value={tokenValue}
    onChange={handleInputChange}
    onFocus={() => setShowOptions(true)}
    onBlur={() => setShowOptions(false)}
    onKeyDown={handleKeyDown}
    placeholder={placeholder}
    // onPaste={e => console.log('PASTE >>>>', { e }, e.target)}
    onPaste={e => console.log('PASTE >>>>', { e }, e.target)}
  />
);

StringInput.propTypes = {
  setShowOptions: PropTypes.func,
  tokenValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export { StringInput };
