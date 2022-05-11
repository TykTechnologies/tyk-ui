import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { stringToTokenString, setCursorPos } from './service';

function StringInput({
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
  name,
  contextMaxLength,
}) {
  const [isPasteEvent, setIsPasteEvent] = useState(false);

  useEffect(() => {
    // Set height if initial value exists
    if (tokenValue) {
      const tokenLen = tokenValue.length > 50 ? tokenValue.length / 5 : 0;
      setStringBuilderHeight(inputRef.current.scrollHeight + tokenLen);
    }
  }, []);

  /**
   *
   * @param {*} e : Event
   * Handle delete event (fn + delete on mac)
   */

  const handleDelete = (e) => {
    const { selectionEnd } = e.target;
    if (selectionEnd === tokenValue.length) {
      // - Cursor is at the end of input
      return;
    }

    const stringBeforeCursor = tokenValue.substring(0, selectionEnd);
    const stringAfterCursor = tokenValue.slice(selectionEnd);

    const tokenStringForStringAfterCursor = stringToTokenString(
      stringAfterCursor,
      options,
    );
    if (tokenStringForStringAfterCursor.startsWith('__TOKEN__')) {
      // If string before delete is a token
      const splitTokens = tokenStringForStringAfterCursor.split(/__TOKEN__(.*?)__TOKEN__/g).filter((t) => t !== '');
      const firstToken = splitTokens[0];
      const newTokenValue = `${stringBeforeCursor}${stringAfterCursor.substr(firstToken.length)}`;
      const newTokenizedString = stringToTokenString(newTokenValue, options);
      setTokenString(newTokenizedString);
      setCursorPos(inputRef, selectionEnd);
      return;
    }
    const newTokenValue = `${stringBeforeCursor}${stringAfterCursor.substr(1)}`;
    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
    setCursorPos(inputRef, selectionEnd);
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
        setTokenString(
          tokenString.slice(0, -`__TOKEN__${lastCharsInString}__TOKEN__`.length),
        );
        return;
      }
      if (tokenValue.endsWith('      ')) {
        const invalidToken = tokenValue.match(invalidTokenRegex);
        const newTokenValue = tokenValue.slice(0, -`  ${invalidToken[invalidToken.length - 1]}      `.length);
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
      const splitTokens = tokenStringForStringBeforeCursor.split(/__TOKEN__(.*?)__TOKEN__/g);
      const lastToken = splitTokens[splitTokens.length - 2];
      const newTokenValue = `${stringBeforeCursor.slice(0, -(lastToken.length))}${stringAfterCursor}`;
      const newTokenizedString = stringToTokenString(newTokenValue, options);
      setTokenString(newTokenizedString);
      setCursorPos(inputRef, selectionEnd - lastToken.length);
      return;
    }

    const invalidToken = stringBeforeCursor.match(invalidTokenRegex);
    // If Token is Invalid Token
    if (invalidToken?.[0] && invalidToken.length === 1) {
      e.preventDefault();
      const newTokenValue = `${stringBeforeCursor.replaceAll(invalidTokenRegex, '').trim()}${stringAfterCursor}`;
      const newTokenizedString = stringToTokenString(newTokenValue, options);
      setTokenString(newTokenizedString);
      setCursorPos(inputRef, selectionEnd - `  ${invalidToken[0]}      `.length);
      return;
    }

    const newTokenValue = `${stringBeforeCursor.slice(
      0,
      -1,
    )}${stringAfterCursor}`;
    const newTokenizedString = stringToTokenString(newTokenValue, options);
    setTokenString(newTokenizedString);
    setCursorPos(inputRef, selectionEnd - 1);
    // -- END :: Handle backspacing when cursor is in between
  };

  const addCharacterToTokenString = (text, selectionStart) => {
    // Cursor is at end
    if (selectionStart - 1 === tokenValue.length) {
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

  // -- START ::  Handle highlighted text deletion / replacement
  const handleTextSelection = (e, selectedText, key) => {
    const allowedKeys = ['Delete', 'Backspace'];
    if (key.length > 1 && allowedKeys.indexOf(key) === -1) {
      return;
    }
    const { selectionEnd, selectionStart } = e.target;
    const substitute = key.length > 1 ? '' : key;
    if (selectedText.length > 1) {
      const newStr = tokenValue.substring(0, selectionStart)
        + substitute
        + tokenValue.substring(selectionEnd);
      const newTokenStr = stringToTokenString(newStr, options);
      setTokenString(newTokenStr);
      setCursorPos(inputRef, substitute.length ? selectionStart + 1 : selectionStart);
    }
  };
  // -- END ::  Handle highlighted text deletion / replacement

  const handleKeyDown = (e) => {
    const { key } = e;
    const { selectionEnd, selectionStart, value } = e.target;
    const selectedText = value.substring(selectionStart, selectionEnd);

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
    if (key === 'Delete') {
      e.preventDefault();
      handleDelete(e);
    }
    if (e.metaKey && key === 'x') {
      setTokenString('');
    }
    if (selectedText) {
      e.preventDefault();
      handleTextSelection(e, selectedText, key);
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
    e.preventDefault();
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
  };

  return (
    <textarea
      spellCheck={false}
      disabled={disabled}
      className="string-builder__input"
      value={tokenValue}
      onChange={(e) => handleOnChange(e)}
      onKeyDown={(e) => handleKeyDown(e)}
      placeholder={placeholder}
      name={name}
      ref={inputRef}
      style={{ height: `${stringBuilderHeight}px` }}
      maxLength={contextMaxLength}
      onPaste={handlePasteEvent}
      onFocus={handleOnFocus}
      onBlur={() => setInputInFocus(false)}
    />
  );
}

StringInput.propTypes = {
  setShowOptions: PropTypes.func,
  tokenValue: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  tokenString: PropTypes.string,
  stringBuilderHeight: PropTypes.number,
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
  inputRef: PropTypes.instanceOf(Object),
  invalidTokenRegex: PropTypes.instanceOf(RegExp),
  name: PropTypes.string,
  contextMaxLength: PropTypes.number,
};

export { StringInput };
