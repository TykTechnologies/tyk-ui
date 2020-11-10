/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS
import React, { useEffect, useState } from 'react';
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
  inputRef,
  setInputInFocus,
  invalidTokenRegex,
}) => {
  const [contextMaxLength, setContentMaxLength] = useState(
    tokenValue.length + 5,
  );
  const [isPasteEvent, setIsPasteEvent] = useState(false);

  useEffect(() => {
    // Set height if initial value exists
    if (tokenValue) {
      setStringBuilderHeight(inputRef.current.scrollHeight + 20);
    }
  }, []);

  const autoGrow = (e) => {
    if (contextMaxLength - 1 < tokenValue.length) {
      const newHeight = e.target.scrollHeight + 3;
      setStringBuilderHeight(newHeight);
      setContentMaxLength(contextMaxLength + 15);
    }
  };

  const setCursorPos = (pos) => {
    setTimeout(() => {
      inputRef.current.setSelectionRange(pos, pos);
    }, 20);
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
      if (lastToken === lastCharsInString && !invalidTokenRegex) {
        e.preventDefault();
        setTokenString(
          tokenString.slice(0, -`__TOKEN__${lastCharsInString}__TOKEN__`.length),
        );
        return;
      }
      if (invalidTokenRegex) {
        const newTokenValue = tokenValue.slice(0, -1);
        const newTokenStr = stringToTokenString(newTokenValue, options);
        setTokenString(newTokenStr);
        return;
      }
      setTokenString(tokenString.slice(0, -1));
      return;
    }
    // -- END :: Handle backspacing when cursor is at the end of the string

    // -- START :: Handle backspacing when cursor is in between
    const stringBeforeCursor = tokenValue.substring(0, selectionEnd);
    const stringAfterCursor = tokenValue.slice(selectionEnd);

    const tokenStringForStringBeforeCursor = stringToTokenString(stringBeforeCursor, options);

    // -- IF the string before cursor is a token
    if (tokenStringForStringBeforeCursor.endsWith('__TOKEN__')) {
      e.preventDefault();
      const splitTokens = tokenString.split(/__TOKEN__(.*?)__TOKEN__/g);
      const lastToken = splitTokens[splitTokens.length - 2];
      const newTokenValue = `${stringBeforeCursor.slice(0, -(lastToken.length))}${stringAfterCursor}`;
      const newTokenizedString = stringToTokenString(newTokenValue, options);
      setTokenString(newTokenizedString);
      setCursorPos(selectionEnd - lastToken.length);
      return;
    }


    const newTokenValue = `${stringBeforeCursor.slice(
      0,
      -1,
    )}${stringAfterCursor}`;
    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
    setCursorPos(selectionEnd - 1);
    // -- END :: Handle backspacing when cursor is in between
  };

  const addCharacterToTokenString = (text, selectionStart) => {
    // Cursor is at end
    if (selectionStart === tokenValue.length) {
      setTokenString(`${tokenString}${text}`);
      return;
    }

    // Cursor is in middle of string
    const newTokenValue = tokenValue.slice(0, selectionStart - 1)
      + text
      + tokenValue.slice(selectionStart - 1);

    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
  };

  const handleKeyDown = (e) => {
    const { key } = e;
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
      e.preventDefault();
      handleBackSpace(e);
    }
    if (e.metaKey && key === 'x') {
      setTokenString('');
    }
  };

  const handleOnChange = (e) => {
    const { target } = e;
    const { selectionStart, value } = target;

    if (showOptions) {
      setShowOptions(false);
    }
    setTokenValue(value);
    if (value && !isPasteEvent) {
      const text = value.charAt(selectionStart - 1);
      addCharacterToTokenString(text, selectionStart);
    }
    setIsPasteEvent(false);
  };

  const handlePasteEvent = (e) => {
    const { clipboardData } = e;
    const { selectionStart, selectionEnd } = e.target;
    setIsPasteEvent(true);
    let pasteString = clipboardData.getData('text/plain');
    if (selectionStart !== selectionEnd) {
      pasteString = tokenValue.slice(0, selectionStart)
        + pasteString
        + tokenValue.slice(selectionEnd, tokenValue.length);
      const newTokenString = stringToTokenString(pasteString, options);
      setTokenString(newTokenString);
      return;
    }
    const newTokenString = stringToTokenString(pasteString, options);
    addCharacterToTokenString(newTokenString, selectionStart);
  };

  const handleOnFocus = () => {
    setInputInFocus(true);
    setShowOptions(false);
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
      style={{ height: `${stringBuilderHeight}px` }}
      maxLength={contextMaxLength}
      onPaste={handlePasteEvent}
      onFocus={handleOnFocus}
      onBlur={() => setInputInFocus(false)}
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
  setInputInFocus: PropTypes.func,
  showOptions: PropTypes.bool,
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      className: PropTypes.string,
      desc: PropTypes.string,
    }),
  ),
  inputRef: PropTypes.element,
  invalidTokenRegex: PropTypes.string,
};

export { StringInput };
