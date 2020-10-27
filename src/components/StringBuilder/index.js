import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { usePrevious } from '../../hooks';


import { StringInput } from './js/string-input';
import { TokenizedString } from './js/tokenized-string';
import { OptionsList } from './js/options-list';

/**
 * - String builder component used to build one single string using the given options.
 * - This component can be useful from UX perspective,
 * when user needs to build any string which might contain complex values which are error prone.
 * - `<StringBuilder />` abstracts the complex values by supplying them
 * as selectable options in more user friendly format with description for user.
 */

const StringBuilder = ({ options, onChange, value = '' }) => {
  const [tokenValue, setTokenValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [tokenString, setTokenString] = useState(value);
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

  const handleOptionSelection = (option) => {
    let newInput = '';
    if (prevTokenString && prevTokenString !== value) {
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
      newInput = prevTokenString + tokenValue.split(prevTokenValue)[1];
    }
    const tokenizedString = `${newInput || tokenValue}__TOKEN__${option.id}__TOKEN__`;
    setTokenString(tokenizedString);
  };

  const handleKeyDown = (e) => {
    // Handle Delete / Backspace
    if (e.keyCode === 8) {
      const lastToken = tokens[tokens?.length - 2];
      const lastCharsInString = tokenValue.slice(-lastToken?.length);
      if (lastToken === lastCharsInString) {
        e.preventDefault();
        setTokenString(tokenString.slice(0, -`__TOKEN__${lastCharsInString}__TOKEN__`.length));
      }
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
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    desc: PropTypes.string,
  })),
  onChange: PropTypes.func,
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
 * 2. Backspace detection.
 * 3. Foreign item detection
 */
