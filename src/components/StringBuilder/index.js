import React, { useEffect, useState, useRef } from 'react';
import FloatingContainer from '../FloatingContainer';
import Pill from '../Pill';
import Button from '../Button';

const TokenizedString = ({ tokens }) => {
  console.log('>>>>', { tokens });
  return tokens?.map(token => <Pill theme="default">{token.name}</Pill>);
};

const StringBuilder = () => {
  const [value, setValue] = useState('');
  const [tokens, setTokens] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  const inputRef = useRef();

  const options = [
    { id: '{{.arguments.id}}', name: 'argument: id', theme: 'primary' },
    { id: '{{.object.name}}', name: 'object: id', theme: 'success' },
    { id: '{{.object.xyz}}', name: 'object: xyz' },
  ];

  useEffect(() => {
    console.log({ value, tokens });
  }, [value, tokens]);

  const addOption = (option) => {
    setTokens([...tokens, option]);
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
        {value}
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
