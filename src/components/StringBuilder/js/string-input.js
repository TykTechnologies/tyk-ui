/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { stringToTokenString } from './service';

const StringInput = ({
  setShowOptions,
  tokenValue,
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
   * - Also handles if the string is manipulated from middle
   */
  const handleBackSpace = (e) => {
    const { selectionEnd } = e.target;
    // -- START :: Handle backspacing when cursor is at the end of the string
    if (selectionEnd === tokenValue.length) {
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
    console.log('MID_STRING_MANIPULATION');
    const stringBeforeCursor = tokenValue.substring(0, selectionEnd);
    const stringAfterCursor = tokenValue.slice(selectionEnd);
    const newTokenValue = `${stringBeforeCursor.slice(0, -1)}${stringAfterCursor}`;
    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
    // -- END :: Handle backspacing when cursor is in between
  };

  const addCharacterToTokenString = (text, selectionStart) => {
    // debugger;
    // Cursor is at end
    if (selectionStart === tokenValue.length) {
      setTokenString(`${tokenString}${text}`);
      return;
    }

    // Cursor is in middle of string
    const newTokenValue = tokenValue.slice(0, selectionStart)
      + text
      + tokenValue.slice(selectionStart);

    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
  };

  const handleKeyDown = (e) => {
    // debugger;
    const { key, target } = e;
    const { selectionStart, value } = target;
    console.log({
      e,
      KEY: e.key,
      Start: e.target.selectionStart,
      END: e.target.selectionEnd,
      value,
      setTokenValue,
    });
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
    if (!e.metaKey && !e.altKey && !e.ctrlKey) {
      if (String(key).length === 1 || key === 'Space') {
        let text = key;
        if (key === 'Space') {
          text = ' ';
        }
        addCharacterToTokenString(text, selectionStart);
      }
    }
  };

  const handleOnChange = (e) => {
    if (showOptions) {
      setShowOptions(false);
    }
    setTokenValue(e.target.value);
  };

  return (
    <textarea
      spellCheck={false}
      disabled={disabled}
      className="string-builder__input"
      value={tokenValue}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
      onKeyUp={autoGrow}
      placeholder={placeholder}
      ref={inputRef}
      style={{ height: stringBuilderHeight }}
      maxLength={contextMaxLength}
    />
  );
};

StringInput.propTypes = {
  setShowOptions: PropTypes.func,
  tokenValue: PropTypes.string,
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
