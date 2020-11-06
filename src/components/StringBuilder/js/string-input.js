/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { stringToTokenString } from './service';

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
  options,
  setTokenValue,
}) => {
  const [contextMaxLength, setContentMaxLength] = useState(tokenValue.length + 5);
  const inputRef = useRef();

  useEffect(() => {
    // Set height if initial value exists
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
    // -- START :: Handle backspacing when cursor is at the end of the string
    if (e.target.selectionEnd === tokenValue.length) {
      const lastToken = tokens[tokens?.length - 2];
      const lastCharsInString = tokenValue.slice(-lastToken?.length);
      if (lastToken === lastCharsInString) {
        e.preventDefault();
        setTokenString(tokenString.slice(0, -`__TOKEN__${lastCharsInString}__TOKEN__`.length));
        return;
      }
      setTokenString(tokenString.slice(0, -1));
      return;
    }
    // -- END :: Handle backspacing when cursor is at the end of the string

    // -- START :: Handle backspacing when cursor is in between
    console.log('MID_STRING_MANIPULATION ::::: c');

    // -- END :: Handle backspacing when cursor is in between
  };

  const handleKeyDown = (e) => {
    const { key, target } = e;
    const { selectionStart, value } = target;
    // console.log({
    //   e,
    //   KEY: e.key,
    //   Start: e.target.selectionStart,
    //   END: e.target.selectionEnd,
    //   value,
    // });
    setTokenValue(value);
    if (key === dropdownTriggerKey && !showOptions) {
      e.preventDefault();
      setShowOptions(true);
      return;
    }
    if (key === 'Enter') {
      e.preventDefault();
      return;
    }
    if (key === 'Backspace') {
      handleBackSpace(e);
      return;
    }
    if (String(e.key).length === 1) {
      // Cursor is at end
      if (selectionStart === tokenValue.length) {
        setTokenString(`${tokenString}${e.key}`);
        return;
      }
      // Cursor is in middle of string
      const newTokenValue = tokenValue.slice(0, selectionStart)
        + e.key
        + tokenValue.slice(selectionStart);

      const newTokensisedString = stringToTokenString(newTokenValue, options);
      setTokenString(newTokensisedString);

      console.log('NEW_TOKEN_STRING >>>', { newTokensisedString });
    }
  };

  const handleOnClick = (e) => {
    console.log('CLICKED >> ', { e });
    // console.log({
    //   Start: e.target.selectionStart,
    //   END: e.target.selectionEnd,
    // });
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
  setTokenValue: PropTypes.func,
  showOptions: PropTypes.bool,
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    desc: PropTypes.string,
  })),
};

export { StringInput };
