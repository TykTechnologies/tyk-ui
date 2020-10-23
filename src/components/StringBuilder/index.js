import React, { useEffect, useState, useRef } from 'react';
import usePrevious from '../../hooks/usePrevious';
import FloatingContainer from '../FloatingContainer';
import Tooltip from '../Tooltip';
import Pill from '../Pill';
import Button from '../Button';

const TokenizedString = ({ tokens }) => {
  console.log('');
  return tokens?.map(token => (token.isSpecial ? (
    <Tooltip
      render={'{{.arguments.id}}'}
      position="top"
    >
      <Pill theme="default">{token.name}</Pill>
      {' '}
    </Tooltip>
  ) : <span>{token.name}</span>));
};


/**
 * String builder component used to build one single string using the given options
 */
const StringBuilder = () => {
  const [value, setValue] = useState('');
  const [tokens, setTokens] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const prevValue = usePrevious(value);

  const inputRef = useRef();

  const options = [
    { id: '{{.arguments.id}}', name: 'argument: id', theme: 'primary' },
    { id: '{{.object.name}}', name: 'object: id', theme: 'success' },
    { id: '{{.object.xyz}}', name: 'object: xyz' },
  ];

  useEffect(() => {
    // console.log({ value, tokens });
  }, [value, tokens]);

  const addOption = (option) => {
    console.log('addOption>>>>', { value, option, prevValue });
    if (!tokens.length) {
      setTokens([...tokens, { id: value, name: value }, { ...option, isSpecial: true }]);
    } else {
      setTokens([...tokens, { ...option, isSpecial: true }]);
    }
    setValue(value + option.id);
  };

  return (
    <div className="string-builder">
      <input
        className="string-builder__input"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setShowOptions(false)}
        ref={inputRef}
      />
      <div className="string-builder__styled">
        {/* {value} */}
        <TokenizedString
          tokens={tokens}
          string={value}
        />
        {/* {value} */}
        {/* <span className="string-builder__highlight">token</span> */}
        {/* <Pill theme="default">
          pill in input
          <Button
            noStyle
            iconOnly
            iconType="times"
            size="fit"
            type="button"
          />
        </Pill> */}
      </div>
      {showOptions && (
        <FloatingContainer element={inputRef} size="matchElement">
          <br />
          <div className="url-builder__options">
            {options.map(option => (
              <Pill key={option.id} theme={option.theme || 'default'}>
                <span
                  onMouseDown={() => addOption(option)}
                  role="none"
                >
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
            ))}
          </div>
        </FloatingContainer>
      )}
    </div>
  );
};

export default StringBuilder;
