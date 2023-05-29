import React, { createRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import toast from '../Toast';

/**
 * - CopyToClipboard is used to copy string for a user.
 * - Can be used normally with a text or a custom components (Eg. Button, Icon, etc)
 */

function CopyToClipboard({
  display, copy, children, onCopy, element: Element, ...rest
}) {
  const txtRef = createRef();
  const handleClick = useCallback(() => {
    if (onCopy) {
      onCopy();
    }

    if (!window.navigator.clipboard) {
      txtRef.current.select();
      document.execCommand('copy');
      toast.success('copied');
      return;
    }
    window.navigator.clipboard.writeText(copy);
    toast.success('copied');
  }, [onCopy, txtRef]);

  return (
    <>
      <Element onClick={handleClick} onKeyUp={handleClick} {...rest}>
        {children || display}
      </Element>
      {!window.navigator.clipboard ? (
        <textarea ref={txtRef} className="tyk-copy-to-clipboard" name="copy" value={copy}>
          {copy}
        </textarea>
      ) : null}
    </>
  );
}

CopyToClipboard.propTypes = {
  /** Callback function executed after text is copied */
  onCopy: PropTypes.func,
  /** Text to be copied */
  copy: PropTypes.string.isRequired,
  /** Text to be displayed */
  display: PropTypes.string,
  /** Element to wrap the content with */
  element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  /** Children of custom element if you are using any custom element */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default CopyToClipboard;
