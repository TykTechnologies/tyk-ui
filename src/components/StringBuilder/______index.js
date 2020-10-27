import React, { useEffect, useState, useRef } from 'react';
import FloatingContainer from '../FloatingContainer';
import Pill from '../Pill';
import Button from '../Button';

const TokenizedString = ({ tokens, options }) => {
  // console.log('TokenizedString>>', { tokens });
  const tokenArr = tokens.map((token) => {
    const matchedToken = options.find(option => option.id === token);
    if (matchedToken) {
      return <span className="special_token">{token}</span>;
    }
    return <span>{token}</span>;
  });
  return tokenArr;
};


/**
 * String builder component used to build one single string using the given options
 */
const StringBuilder = () => {
  const [value, setValue] = useState('');
  const [tokenValue, setTokenValue] = useState('');
  const [preTokenizationValue, setPreTokenizationValue] = useState('');
  const [tokens, setTokens] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  console.log({
    value, tokenValue,
  });

  const inputRef = useRef();

  const options = [
    { id: '{{.arguments.id}}', name: 'argument: id', theme: 'primary' },
    { id: '{{.object.name}}', name: 'object: id', theme: 'success' },
    { id: '{{.object.xyz}}', name: 'object: xyz' },
  ];

  useEffect(() => {
    const tempTokenValue = tokenValue;
    const splitTokens = tempTokenValue.split(/__TYK__(.*?)__TYK__/g);
    setTokens(splitTokens);
  }, [tokenValue]);

  const addOption = (option) => {
    // console.log('addOption>>>>', { value, option, prevValue });
    // if (!tokens.length) {
    //   setTokens([...tokens, { id: value, name: value }, { ...option, isSpecial: true }]);
    // } else {
    //   setTokens([...tokens, { ...option, isSpecial: true }]);
    // }
    console.log('preTokenizationValue >>> ', preTokenizationValue);
    const tempTokenValue = `${!preTokenizationValue ? value : preTokenizationValue}__TYK__${option.id}__TYK__`;
    setTokenValue(tempTokenValue);
    setPreTokenizationValue(preTokenizationValue.split(value)[1]);
    setValue(`${value}${option.id}`);
  };

  // Auto increments the height of the input in case of a long string
  const handleHeight = (e) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 5}px`;
  };

  return (
    <div className="string-builder">
      <textarea
        className="string-builder__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setShowOptions(false)}
        onKeyDown={handleHeight}
        ref={inputRef}
      />
      <div className="string-builder__styled">
        <TokenizedString
          tokens={tokens}
          options={options}
        />
      </div>
      {showOptions && (
        <FloatingContainer element={inputRef} size="matchElement">
          <br />
          <div className="url-builder__options">
            {options.map(option => (
              <>
                <Pill key={option.id} theme={option.theme || 'default'}>
                  <span onMouseDown={() => addOption(option)} role="none">
                    {option.name}
                  </span>
                  <Button
                    noStyle
                    iconOnly
                    iconType="times"
                    size="fit"
                    type="button"
                  />
                </Pill>
                <br />
              </>
            ))}
          </div>
        </FloatingContainer>
      )}
    </div>
  );
};

export default StringBuilder;
