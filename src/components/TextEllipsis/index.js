import React from "react";
import PropTypes from "prop-types";
import Tooltip from "../Tooltip";
/**
 * TextEllipsis component helps you to hide a part of a text,
 * but displaying it when it's being hovered.
 * The entire text is displayed with the help of Tooltip component
 */

function TextEllipsis({ text, limit, position, truncateFrom = "end" }) {
  if (text.length <= limit) {
    return text;
  }

  let displayText;

  if (truncateFrom === "start") {
    displayText = `...${text.substring(text.length - limit)}`;
  } else {
    displayText = `${text.substring(0, limit)}...`;
  }

  return (
    <Tooltip render={text} position={position}>
      {displayText}
    </Tooltip>
  );
}

TextEllipsis.propTypes = {
  /** Text to be shrinked by TextEllipsis */
  text: PropTypes.string,
  /** Number of characters that TextEllipsis would leave visible */
  limit: PropTypes.number,
  /** tooltip position */
  position: PropTypes.string,
  /** Where to truncate text from - 'end' (default) shows beginning of text, 'start' shows end of text */
  truncateFrom: PropTypes.oneOf(["end", "start"]),
};

export default TextEllipsis;
