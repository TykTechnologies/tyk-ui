import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
// import Button from '../../Button';

export const TokenizedString = ({ tokens, options }) => {
  const hasDuplicates = +new Set(tokens).size !== tokens.length;

  const allTokens = tokens
    && tokens.map((token) => {
      if (options) {
        // if token matches option
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
      // if invalid token
      const invalidToken = token.match(/({.*?})/g);
      if (invalidToken) {
        const splitTokens = token.split(invalidToken);
        console.log({ token, splitTokens, invalidToken });
        return (
          <span key={`${token}${hasDuplicates && Math.random()}`}>
            <span>{splitTokens[0]}</span>
            <Tooltip
              render="invalid token detected"
              position="top"
            >
              <span className="invalid_token">{invalidToken}</span>
            </Tooltip>
            <span>{splitTokens[1]}</span>
          </span>
        );
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
