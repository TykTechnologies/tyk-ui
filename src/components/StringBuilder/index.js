import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { usePrevious } from '../../hooks';


import { StringInput } from './js/string-input';
import { TokenizedString } from './js/tokenized-string';
import { OptionsList } from './js/options-list';

const initialValueToTokenString = (value, options) => {
  let tempStr = value;
  options.forEach((option) => {
    tempStr = tempStr.replace(option.id, `__TOKEN__${option.id}__TOKEN__`);
  });
  return tempStr;
};

/**
 * - String builder component used to build one single string using the given options.
 * - This component can be useful from UX perspective,
 * when user needs to build any string which might contain complex values which are error prone.
 * - `<StringBuilder />` abstracts the complex values by supplying them
 * as selectable options in more user friendly format with description for user.
 */

const StringBuilder = ({ options, onChange, value }) => {
  const [tokenValue, setTokenValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [tokenString, setTokenString] = useState(initialValueToTokenString(value, options));
  const [tokens, setTokens] = useState([]);
  const [prevTokenValue, setPrevTokenValue] = useState('');

  const prevTokenString = usePrevious(tokenString);

  const inputRef = useRef();

  // Execute callback on value change
  useEffect(() => {
    if (onChange) {
      onChange(tokenValue);
    }
  }, [tokenValue]);

  /**
   * Split string into tokens and set string value w/o __TOKEN__
   * Tokens are used to render a styled tokens using `<TokenizedString />`
   */
  useEffect(() => {
    const splitTokens = tokenString.split(/__TOKEN__(.*?)__TOKEN__/g);
    const splitTokensStr = splitTokens.join('');
    setTokens(splitTokens);
    setTokenValue(splitTokensStr);
    setPrevTokenValue(splitTokensStr);
  }, [tokenString]);


  const handleInputChange = (e) => {
    setTokenValue(e.target.value);
  };

  /**
   *
   * @param {*} option : Option object for selected option from dropdown
   * When user selects an option append and prepend `__TOKEN__` to detect the token,
   * so they can be styled or manipulated later
   */
  const handleOptionSelection = (option) => {
    let newInput = '';
    if (prevTokenString && prevTokenString !== value) {
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
      newInput = prevTokenString + tokenValue.split(prevTokenValue)[1];
    }
    const tokenizedString = `${newInput || tokenValue}__TOKEN__${option.id}__TOKEN__`;
    setTokenString(tokenizedString);
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
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 8) {
      handleBackSpace(e);
    }
  };

  return (
    <div className="string-builder">
      <StringInput
        setShowOptions={setShowOptions}
        tokenValue={tokenValue}
        handleInputChange={handleInputChange}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
      />
      <TokenizedString
        tokens={tokens}
        options={options}
      />
      <OptionsList
        showOptions={showOptions}
        options={options}
        handleOptionSelection={handleOptionSelection}
        inputRef={inputRef}
      />
    </div>
  );
};

StringBuilder.propTypes = {
  /** Options to render in the list */
  options: PropTypes.arrayOf(PropTypes.shape({
    /** id is the value that will be appended to the string on selection */
    id: PropTypes.string.isRequired,
    /** name of option (view) */
    name: PropTypes.string.isRequired,
    /** to style / highlight the token */
    className: PropTypes.string,
    /** description of option */
    desc: PropTypes.string,
  })),
  /** Callback executed on change of string value */
  onChange: PropTypes.func,
  /** Initial value */
  value: PropTypes.string,
};

StringBuilder.defaultProps = {
  onChange: null,
  value: '',
  options: [],
};

export default StringBuilder;

/**
 * TODO :
 * 1. Error handling and validation.
 * 2. Backspace detection. (Done)
 * 3. Foreign item detection
 * 4. Mid string manipulation
 * 5. Copy paste
 */
