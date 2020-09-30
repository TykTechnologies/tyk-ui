import React, { Fragment, createRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import toast from '../Toast';

const CopyToClipboard = (props) => {
  const {
    display, copy, children, onCopy,
  } = props;
  const txtRef = createRef();
  const handleClick = useCallback(() => {
    if (onCopy) {
      onCopy();
    }

    if (!window.navigator.clipboard) {
      txtRef.current.select();
      document.execCommand('copy');
      toast.notify('copied', { theme: 'success' });
      return;
    }
    window.navigator.clipboard.writeText(copy);
    toast.notify('copied', { theme: 'success' });
  }, [onCopy, txtRef]);

  return (
    <Fragment>
      <props.element onClick={handleClick} onKeyUp={handleClick} {...props}>
        {children || display}
      </props.element>
      {!window.navigator.clipboard ? (
        <textarea ref={txtRef} className="tyk-copy-to-clipboard" name="copy" value={copy}>
          {copy}
        </textarea>
      ) : null}
    </Fragment>
  );
};

CopyToClipboard.propTypes = {
  onCopy: PropTypes.func,
  copy: PropTypes.string,
  display: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default CopyToClipboard;
