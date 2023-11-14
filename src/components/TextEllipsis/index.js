import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../Tooltip';
/**
 * TextEllipsis component helps you to hide a part of a text,
 * but displaying it when it's being hovered.
 * The entire text is displayed with the help of Tooltip component
 */

function TextEllipsis({ text, limit, position }) {
  return (
    text.length > limit
      ? (
        <Tooltip render={text} position={position}>
          {text.substring(0, limit)}
          ...
        </Tooltip>
      )
      : text
  );
}

TextEllipsis.propTypes = {
  /** Text to be shrinked by TextEllipsis */
  text: PropTypes.string,
  /** Number of characters that TextEllipsis would leave visible */
  limit: PropTypes.number,
  /** tooltip position */
  position: PropTypes.string,
};

export default TextEllipsis;
