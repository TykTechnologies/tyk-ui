import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message';

function InfoNote({ children }) {
  return (
    <div className="tyk-info-note">
      <Message theme="info">
        { children }
      </Message>
    </div>
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
