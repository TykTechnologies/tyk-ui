import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';

const TextEllipsis = ({ text, limit }) => (
  text.length > limit
    ? (
      <Tooltip render={text}>
        {text.substring(0, limit)}
        ...
      </Tooltip>
    )
    : text
);

TextEllipsis.propTypes = {
  text: PropTypes.string,
  limit: PropTypes.number,
};

export default TextEllipsis;
