import React from 'react';
import PropTypes from 'prop-types';

export const TokenizedString = ({ tokens, options }) => {
  const hasDuplicates = +new Set(tokens).size !== tokens.length;
  console.log();
  const allTokens = tokens
    && tokens.map((token) => {
      if (options) {
        const matchedOption = options.find(option => option.id === token);
        if (matchedOption) {
          return (
            <span
              key={`${token}${hasDuplicates && Math.random()}`}
              className={`${matchedOption.className || 'default-option-name'}`}
            >
              {matchedOption.id}
            </span>
          );
        }
      }
      return (
        <span key={`${token}${hasDuplicates && Math.random()}`}>{token}</span>
      );
    });
  return <div className="string-builder__styled">{allTokens}</div>;
};

TokenizedString.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};
