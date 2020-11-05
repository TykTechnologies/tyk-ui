/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS
import React, { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

const StringInput = ({
  setShowOptions,
  tokenValue,
  handleInputChange,
  disabled,
  placeholder,
  tokens,
  dropdownTriggerKey,
  setStringBuilderHeight,
  stringBuilderHeight,
  setTokenString,
  tokenString,
  showOptions,
}) => {
  const [contextMaxLength, setContentMaxLength] = useState(tokenValue.length + 5);
  const inputRef = useRef();

  useEffect(() => {
    if (tokenValue) {
      setStringBuilderHeight(`${(inputRef.current.scrollHeight + 20)}px`);
    }
  }, []);

  const autoGrow = (e) => {
    if (contextMaxLength - 1 < tokenValue.length) {
      const newHeight = `${e.target.scrollHeight + 3}px`;
      setStringBuilderHeight(newHeight);
      setContentMaxLength(contextMaxLength + 15);
    }
  };

  /**
   *
   * @param {*} e : Event
   * Handle backspace event
   * - If the last thing added by user was a token prevent default and
   * remove the entire token instead of single character, else continue with default behaviour
   */
  const handleBackSpace = (e) => {
    const lastToken = tokens[tokens?.length - 2];
    const lastCharsInString = tokenValue.slice(-lastToken?.length);
    if (lastToken === lastCharsInString) {
      e.preventDefault();
      setTokenString(tokenString.slice(0, -`__TOKEN__${lastCharsInString}__TOKEN__`.length));
      return;
    }
    setTokenString(tokenString.slice(0, -1));
  };

  const handleKeyDown = (e) => {
    console.log({
      e,
      KEY: e.key,
      Start: e.target.selectionStart,
      END: e.target.selectionEnd,
    });
    if (e.key === dropdownTriggerKey && !showOptions) {
      e.preventDefault();
      setShowOptions(true);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      handleBackSpace(e);
      return;
    }
    if (String(e.key).length === 1) {
      setTokenString(`${tokenString}${e.key}`);
    }
  };

  const handleOnClick = (e) => {
    console.log({
      Start: e.target.selectionStart,
      END: e.target.selectionEnd,
    });
  };

  return (
    <textarea
      spellCheck={false}
      disabled={disabled}
      className="string-builder__input"
      value={tokenValue}
      onClick={handleOnClick}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onKeyUp={autoGrow}
      placeholder={placeholder}
      onPaste={e => console.log('PASTE >>>>', { e }, e.target)}
      ref={inputRef}
      style={{ height: stringBuilderHeight }}
      maxLength={contextMaxLength}
    />
  );
};

StringInput.propTypes = {
  setShowOptions: PropTypes.func,
  tokenValue: PropTypes.string,
  handleInputChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  tokenString: PropTypes.string,
  stringBuilderHeight: PropTypes.string,
  dropdownTriggerKey: PropTypes.string,
  setStringBuilderHeight: PropTypes.func,
  setTokenString: PropTypes.func,
  showOptions: PropTypes.bool,
  tokens: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    desc: PropTypes.string,
  })),
};

export { StringInput };
