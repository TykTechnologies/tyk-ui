import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';


import { StringInput } from './js/string-input';
import { TokenizedString } from './js/tokenized-string';
import { OptionsList } from './js/options-list';

const tempOptions = [
  {
    id: '{{.arguments.id}}',
    name: 'arguments: id',
    desc: 'Argument Id',
    className: 'data_source_argument',
  },
  {
    id: '{{.object.name}}',
    name: 'User: name',
    desc: 'name on type User',
    className: 'data_source_object',
  },
];

/**
 * - String builder component used to build one single string using the given options.
 * - This component can be useful from UX perspective,
 * when user needs to build any string which might contain complex values which are error prone.
 * - `<StringBuilder />` abstracts the complex values by supplying them
 * as selectable options in more user friendly format with description for user.
 */

const StringBuilder = ({ onChange, value = '' }) => {
  const options = tempOptions;
  const [tokenValue, setTokenValue] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const [tokenString, setTokenString] = useState('');
  const [tokens, setTokens] = useState([]);

  const inputRef = useRef();

  // Execute callback on value change
  useEffect(() => {
    if (onChange) {
      onChange(tokenValue);
    }
    console.log({
      tokenValue,
      options,
      setTokenValue,
    });
  }, [tokenValue]);

  useEffect(() => {
    setTokens(tokenString.split(/__TOKEN__(.*?)__TOKEN__/g));
  }, [tokenString]);


  const handleInputChange = (e) => {
    console.log('handleInputChange', e);
    setTokenValue(e.target.value);
  };

  const handleOptionSelection = (option) => {
    // setTokenValue(`${tokenValue}${option.id}`);
    const tokenizedString = `${tokenValue}__TOKEN__${option.id}__TOKEN__`;
    setTokenString(tokenizedString);
  };

  return (
    <div className="string-builder">
      <StringInput
        setShowOptions={setShowOptions}
        tokenValue={tokenValue}
        handleInputChange={handleInputChange}
        inputRef={inputRef}
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
  // options: PropTypes.arrayOf({
  //   id: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   className: PropTypes.string,
  // }),
  onChange: PropTypes.func,
  value: PropTypes.string,
};

StringBuilder.defaultProps = {
  onChange: null,
  value: '',
  // options: [],
};

export default StringBuilder;

/**
 * TODO :
 * 1. Error handling and validation.
 * 2. Backspace detection.
 * 3. Foreign item detection
 */
