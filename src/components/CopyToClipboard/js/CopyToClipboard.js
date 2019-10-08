import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CopyToClipboard = (props) => {
  const { display, copy } = props;

  const handleClick = () => window.navigator.clipboard.writeText(copy);

  return (
    <Fragment>
      <props.element
        onClick={handleClick}
        onKeyUp={handleClick}
        {...props}
      >
        {display}
      </props.element>
    </Fragment>
  );
};

CopyToClipboard.propTypes = {
  copy: PropTypes.string,
  display: PropTypes.string,
};

export default CopyToClipboard;
