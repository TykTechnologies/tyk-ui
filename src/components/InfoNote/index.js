import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message';

function InfoNote({ children }) {
  return (
    <Message theme="info">
      { children }
    </Message>
  );
}

InfoNote.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default InfoNote;
