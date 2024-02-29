import React from 'react';
import PropTypes from 'prop-types';
import InvalidToken from './invalid-token';

export function TokenizedString(props) {
  const {
    tokens,
    options,
    disabled,
    invalidTokenRegex,
    findInvalidTokenSubstitute,
  } = props;

  /**
   * hasDuplicates : used to avoid duplicate keys in map :
   * having duplicate tokens causes invalid unpredictable react renders.
   * eg: http://alpaha.com/{{.agruments.id}}/id={{.arguments.id}}
   * `{{.arguments.id}}` is repeated twice : maybe edge case but quite possible
   */

  const hasDuplicates = new Set(tokens).size !== tokens.length;

  const allTokens = tokens?.map((token) => {
    const key = `${token}${hasDuplicates && Math.random()}`;

    if (!options) {
      return (
        <span key={key}>{token}</span>
      );
    }

    const matchedOption = options.find((option) => option.id === token);

    // if invalid token
    if (invalidTokenRegex && !matchedOption) {
      const matchedTokens = token.replaceAll(' ', '').split(invalidTokenRegex);
      if (matchedTokens?.length > 1) {
        return (
          <span key={key}>
            {matchedTokens.map((tkn) => {
              if (tkn.match(invalidTokenRegex)) {
                return (
                  <InvalidToken
                    key={tkn}
                    token={tkn}
                    findInvalidTokenSubstitute={findInvalidTokenSubstitute}
                  />
                );
              }
              return (<span key={tkn}>{`${tkn} `}</span>);
            })}
          </span>
        );
      }
    }

    // if token matches option
    if (matchedOption) {
      return (
        <span
          key={key}
          className={`${matchedOption.className || 'default-option-name'}`}
        >
          {matchedOption.id}
        </span>
      );
    }

    return null;
  });

  return (
    <div className={`string-builder__styled ${disabled && 'string-builder__disabled'}`}>
      {allTokens}
    </div>
  );
}

TokenizedString.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  disabled: PropTypes.bool,
  invalidTokenRegex: PropTypes.instanceOf(RegExp),
  findInvalidTokenSubstitute: PropTypes.func,
};
