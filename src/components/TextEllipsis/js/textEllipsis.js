import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';

const TextEllipsis = ({ text, limit }) => (
  <Tooltip render={text}>
    {text.length > limit ? `${text.substring(0, limit)}...` : text}
  </Tooltip>
);

TextEllipsis.propTypes = {
  text: PropTypes.string,
  limit: PropTypes.number,
};

export default TextEllipsis;
