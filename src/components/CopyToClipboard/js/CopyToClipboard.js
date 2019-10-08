import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CopyToClipboard = (props) => {
  const { display, copy } = props;
  const txtRef = React.createRef();

  const handleClick = () => {
    if (!window.navigator.clipboard) {
      txtRef.current.select();
      document.execCommand('copy');
      return;
    }
    window.navigator.clipboard.writeText(copy);
  };

  return (
    <Fragment>
      <props.element onClick={handleClick} onKeyUp={handleClick} {...props}>
        {display}
        {!window.navigator.clipboard ? (
          <textarea ref={txtRef} className="tyk-copy-to-clipboard" name="copy">
            {copy}
          </textarea>
        ) : (
          ''
        )}
      </props.element>
    </Fragment>
  );
};

CopyToClipboard.propTypes = {
  copy: PropTypes.string,
  display: PropTypes.string,
};

export default CopyToClipboard;
