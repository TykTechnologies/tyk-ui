import React from 'react';
import PropTypes from 'prop-types';

export const TokenizedString = ({ tokens, options }) => {
  const allTokens = tokens && tokens.map((token) => {
    if (options) {
      const matchedOption = options.find(option => option.id === token);
      if (matchedOption) {
        return (
          <span key={token} className={`${matchedOption.className || 'default-option-name'}`}>
            {matchedOption.id}
          </span>
        );
      }
    }
    return <span key={token}>{token}</span>;
  });
  return <div className="string-builder__styled">{allTokens}</div>;
};

TokenizedString.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),

};
