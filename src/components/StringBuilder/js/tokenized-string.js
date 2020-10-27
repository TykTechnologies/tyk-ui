import React from 'react';
import PropTypes from 'prop-types';

export const TokenizedString = ({ tokens, options }) => {
  console.log({ tokens });
  const allTokens = tokens && tokens.map((token) => {
    if (options) {
      const matchedOption = options.find(option => option.id === token);
      if (matchedOption) {
        return (
          <span className={`special_token ${matchedOption.className || ''}`}>
            {matchedOption.id}
          </span>
        );
      }
    }
    return <span>{token}</span>;
  });
  return <div className="string-builder__styled">{allTokens}</div>;
};

TokenizedString.propTypes = {
  tokens: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)),

};
