import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../../../components/Tooltip';

export const TokenizedString = (props) => {
  const {
    tokens, options, disabled, invalidTokenRegex,
  } = props;

  /**
   * hasDuplicates : used to avoid duplicate keys in map :
   * having duplicate tokens causes invalid renders.
   * eg: http://alpaha.com/{{.agruments.id}}/id={{.arguments.id}}
   * `{{.arguments.id}}` is repeated twice : maybe edge case but quite possible
   */

  const hasDuplicates = new Set(tokens).size !== tokens.length;

  const allTokens = tokens
    && tokens.map((token) => {
      if (options) {
        const matchedOption = options.find(option => option.id === token);
        // if invalid token
        if (invalidTokenRegex && !matchedOption) {
          const invalidToken = token.match(invalidTokenRegex);
          if (invalidToken) {
            if (invalidToken.length === 1) {
              const splitTokens = token.split(invalidToken);
              return (
                <span key={`${token}${hasDuplicates && Math.random()}`}>
                  <span>{splitTokens[0]}</span>
                  <Tooltip render="invalid token detected" position="top">
                    <span className="invalid_token">{invalidToken}</span>
                  </Tooltip>
                  <span>{splitTokens[1]}</span>
                </span>
              );
            }
          }
        }
        // if token matches option

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
  return (
    <div
      className={`string-builder__styled ${
        disabled && 'string-builder__disabled'
      }`}
    >
      {allTokens}
    </div>
  );
};

TokenizedString.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  disabled: PropTypes.bool,
  invalidTokenRegex: PropTypes.string,
};
