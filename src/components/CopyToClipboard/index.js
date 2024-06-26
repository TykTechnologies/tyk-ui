import React, { createRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import toast from '../Toast';

/**
 * - CopyToClipboard is used to copy string for a user.
 * - Can be used normally with a text or a custom components (Eg. Button, Icon, etc)
 */

function CopyToClipboard(props) {
  const {
    display, copy, children, onCopy, message = 'copied',
  } = props;
  const txtRef = createRef();
  const handleClick = useCallback(() => {
    if (onCopy) {
      onCopy();
    }

    if (!window.navigator.clipboard) {
      txtRef.current.select();
      document.execCommand('copy');
      toast.success(message);
      return;
    }
    window.navigator.clipboard.writeText(copy);
    toast.success(message);
  }, [onCopy, txtRef]);

  return (
    <>
      <props.element onClick={handleClick} onKeyUp={handleClick} {...props}>
        {children || display}
      </props.element>
      {!window.navigator.clipboard ? (
        <textarea ref={txtRef} className="tyk-copy-to-clipboard" name="copy" value={copy}>
          {copy}
        </textarea>
      ) : null}
    </>
  );
}

CopyToClipboard.propTypes = {
  /** Message to be displayed after text is copied */
  message: PropTypes.string,
  /** Callback function executed after text is copied */
  onCopy: PropTypes.func,
  /** Text to be copied */
  copy: PropTypes.string.isRequired,
  /** Text to be displayed */
  display: PropTypes.string,
  /** Children of custom element if you are using any custom element */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default CopyToClipboard;
