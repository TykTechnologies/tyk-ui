import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { usePrevious } from '../../../hooks';

import { StringInput } from './js/string-input';
import { TokenizedString } from './js/tokenized-string';
import { OptionsList } from './js/options-list';
import { StringBuilderFooter } from './js/string-builder-footer';
import { stringToTokenString, setCursorPos } from './js/service';

/**
 * - String builder component used to build one single string using the given options.
 * - This component can be useful from UX perspective,
 * when user needs to build any string which might contain complex values which are error prone.
 * - `<StringBuilder />` abstracts the complex values by supplying them
 * as selectable options in more user friendly format with description for user.
 * - Wire-frames : https://miro.com/app/board/o9J_kipLWwA=/
 */

const StringBuilder = (props) => {
  const {
    options,
    onChange,
    value,
    theme,
    error,
    disabled,
    note,
    label,
    labelwidth,
    placeholder,
    allowSearch,
    dropdownTriggerKey,
    invalidTokenRegex,
    name,
  } = props;
  const [tokenValue, setTokenValue] = useState(value);
  const [stringBuilderHeight, setStringBuilderHeight] = useState();
  const [showOptions, setShowOptions] = useState(false);
  const [tokenString, setTokenString] = useState(stringToTokenString(value, options));
  const [contextMaxLength, setContentMaxLength] = useState(
    tokenValue.length + 5,
  );
  const [tokens, setTokens] = useState([]);
  const [prevTokenValue, setPrevTokenValue] = useState();
  const [inputInFocus, setInputInFocus] = useState(false);
  const [initialSearchValue, setInitialSearchValue] = useState('');
  const [selectedInvalidToken, setSelectedInvalidToken] = useState(null);

  const prevTokenString = usePrevious(tokenString);

  const containerRef = useRef();
  const inputRef = useRef();

  // Execute callback on value change
  useEffect(() => {
    if (onChange) {
      onChange(tokenValue.replaceAll(' ', ''));
    }
  }, [tokenValue]);

  useEffect(() => {
    const tempVal = invalidTokenRegex ? value.replaceAll(invalidTokenRegex, '  $&      ') : value;
    setTokenValue(tempVal);
    setTokenString(stringToTokenString(tempVal, options));
  }, [value]);

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

  useEffect(() => {
    // Auto Grow Input
    if (contextMaxLength - 3 < tokenValue.length) {
      const newHeight = inputRef.current.scrollHeight + 3;
      setStringBuilderHeight(newHeight);
      setContentMaxLength(contextMaxLength + 25);
    }
  }, [tokenString, tokenValue]);

  /**
   *
   * @param {*} option : Option object for selected option from dropdown
   * When user selects an option append and prepend `__TOKEN__` to detect the token,
   * so they can be styled or manipulated later
   */
  const handleOptionSelection = (option) => {
    let newInput = '';
    const { selectionStart } = inputRef.current;
    if (prevTokenString && prevTokenString !== value && !selectedInvalidToken) {
      /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */
      newInput = prevTokenString + tokenValue.split(prevTokenValue)[1];
    }
    let tokenizedString = '';
    // Adding token in Middle
    if (selectionStart !== tokenValue.length && !selectedInvalidToken) {
      const newTokenValue = tokenValue.slice(0, selectionStart)
        + option.id
        + tokenValue.slice(selectionStart);
      tokenizedString = stringToTokenString(newTokenValue, options);
      setCursorPos(inputRef, selectionStart + option.id.length);
    } else {
      tokenizedString = `${newInput || tokenValue}__TOKEN__${
        option.id
      }__TOKEN__`;
    }
    if (selectedInvalidToken) {
      tokenizedString = tokenString.replace(
        `  ${selectedInvalidToken}      `,
        `__TOKEN__${option.id}__TOKEN__`,
      );
      setSelectedInvalidToken(null);
      setInitialSearchValue('');
    }
    setTokenString(tokenizedString);
    setShowOptions(false);
    setTimeout(() => {
      inputRef.current.focus();
    }, 20);
  };

  const getThemeClasses = () => {
    const themes = theme ? theme.split(' ') : [];
    return themes.map(iTheme => `tyk-form-group--${iTheme}`);
  };

  const getCssClasses = () => [
    'tyk-form-group',
    ...getThemeClasses(),
    error && 'has-error',
    disabled && 'disabled',
  ]
    .filter(Boolean)
    .join(' ');

  const findInvalidTokenSubstitute = (invalidToken) => {
    setSelectedInvalidToken(invalidToken);
    setInitialSearchValue(invalidToken.replace(/[^a-zA-Z ]/g, ''));
    setShowOptions(true);
  };

  return (
    <div className="string-builder" ref={containerRef}>
      <div className={getCssClasses()}>
        {label && (
          <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
        )}
        <div className="tyk-form-control__wrapper">
          <div
            className={`tyk-form-control ${
              disabled && 'string-builder__disabled'
            }`}
            style={{ height: `${stringBuilderHeight}px` }}
          >
            <StringInput
              setInputInFocus={setInputInFocus}
              setShowOptions={setShowOptions}
              tokenValue={tokenValue}
              disabled={disabled}
              placeholder={placeholder}
              allowSearch={allowSearch}
              tokens={tokens}
              dropdownTriggerKey={dropdownTriggerKey}
              setStringBuilderHeight={setStringBuilderHeight}
              stringBuilderHeight={stringBuilderHeight}
              setTokenString={setTokenString}
              tokenString={tokenString}
              showOptions={showOptions}
              options={options}
              setTokenValue={setTokenValue}
              inputRef={inputRef}
              invalidTokenRegex={invalidTokenRegex}
              name={name}
              contextMaxLength={contextMaxLength}
              setContentMaxLength={setContentMaxLength}
            />
            <TokenizedString
              tokens={tokens}
              options={options}
              disabled={disabled}
              invalidTokenRegex={invalidTokenRegex}
              findInvalidTokenSubstitute={findInvalidTokenSubstitute}
            />
            <OptionsList
              showOptions={showOptions}
              options={options}
              handleOptionSelection={handleOptionSelection}
              containerRef={containerRef}
              getThemeClasses={getThemeClasses}
              setShowOptions={setShowOptions}
              allowSearch={allowSearch}
              initialSearchValue={initialSearchValue}
            />
            <StringBuilderFooter
              error={error}
              note={note}
              inputInFocus={inputInFocus}
              stringBuilderHeight={stringBuilderHeight}
              dropdownTriggerKey={dropdownTriggerKey}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

StringBuilder.propTypes = {
  /** Options to render in the list */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      /** id is the value that will be appended to the string on selection */
      id: PropTypes.string.isRequired,
      /** name of option (view) */
      name: PropTypes.string.isRequired,
      /** to style / highlight the token */
      className: PropTypes.string,
      /** description of option */
      desc: PropTypes.string,
    }),
  ),
  /** Callback executed on change of string value */
  onChange: PropTypes.func,
  /** Initial value */
  value: PropTypes.string,
  /** Disable input */
  disabled: PropTypes.bool,
  /** Show error state (w/ or w/o message) */
  error: PropTypes.string,
  /** Component theme */
  theme: PropTypes.string,
  /** Footnote for component */
  note: PropTypes.string,
  /** Label for component */
  label: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
    PropTypes.string,
  ]),
  /** Label Width for component */
  labelwidth: PropTypes.string,
  /** Placeholder for component */
  placeholder: PropTypes.string,
  /** Key To trigger dropdown */
  dropdownTriggerKey: PropTypes.string,
  /** Regex to detect invalid tokens in the value */
  invalidTokenRegex: PropTypes.instanceOf(RegExp),
  /** Allow users to search from options */
  allowSearch: PropTypes.bool,
  name: PropTypes.string,
};

StringBuilder.defaultProps = {
  onChange: null,
  value: '',
  options: [],
  theme: 'default',
};

export default StringBuilder;
