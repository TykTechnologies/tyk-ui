/* eslint-disable no-debugger, no-console */ // TODO: REMOVE THIS

/**
 * TODO :: BUGS
  * - Invalid id styling messes up the next added token
  * -
*/

import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { usePrevious } from '../../hooks';


import { StringInput } from './js/string-input';
import { TokenizedString } from './js/tokenized-string';
import { OptionsList } from './js/options-list';
import { stringToTokenString } from './js/service';

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
  } = props;
  const [tokenValue, setTokenValue] = useState(value);
  const [stringBuilderHeight, setStringBuilderHeight] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [tokenString, setTokenString] = useState(stringToTokenString(value, options));
  const [tokens, setTokens] = useState([]);
  const [prevTokenValue, setPrevTokenValue] = useState();

  const prevTokenString = usePrevious(tokenString);

  const containerRef = useRef();

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
    setShowOptions(false);
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
  ].filter(Boolean).join(' ');

  return (
    <div className="string-builder" ref={containerRef}>
      {label && (
        <label style={{ flexBasis: labelwidth || 'auto' }}>{label}</label>
      )}
      <div className={getCssClasses()}>
        <div className="tyk-form-control__wrapper">
          <div
            className="tyk-form-control"
            style={{ height: stringBuilderHeight }}
          >
            <StringInput
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
            />
            <TokenizedString
              tokens={tokens}
              options={options}
            />
            <OptionsList
              showOptions={showOptions}
              options={options}
              handleOptionSelection={handleOptionSelection}
              containerRef={containerRef}
              getThemeClasses={getThemeClasses}
              setShowOptions={setShowOptions}
              allowSearch={allowSearch}
            />
            <div style={{ marginTop: stringBuilderHeight || '30px' }}>
              {note && <p className="tyk-form-control__help-block">{note}</p>}
              {error && error !== 'true' && error !== 'false' && (
                <p className="tyk-form-control__error-message">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>
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
  /** Disable input */
  disabled: PropTypes.bool,
  /** Show error state (w/ or w/o message) */
  error: PropTypes.string,
  /** Component theme */
  theme: PropTypes.string,
  /** Footnote for component */
  note: PropTypes.string,
  /** Label for component */
  label: PropTypes.string,
  /** Label Width for component */
  labelwidth: PropTypes.string,
  /** Placeholder for component */
  placeholder: PropTypes.string,
  /** Key To trigger dropdown */
  dropdownTriggerKey: PropTypes.string,
  /** Allow users to search from options */
  allowSearch: PropTypes.bool,
};

StringBuilder.defaultProps = {
  onChange: null,
  value: '',
  options: [],
  theme: 'default',
};

export default StringBuilder;
