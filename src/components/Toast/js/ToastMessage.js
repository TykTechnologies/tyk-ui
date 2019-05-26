import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import Message from '../../Message';
import useTimeout from '../../../common/js/hooks/useTimeout';

const ToastMessage = (props) => {
  const {
    children,
    options,
    onClose,
    index,
  } = props;
  const opts = Object.assign({
    theme: 'success',
    delay: 3000,
  }, options);
  let timer;

  const handleClose = (itemIndex) => {
    onClose(itemIndex);
    clearTimeout(timer);
  };

  useTimeout(() => handleClose(index), opts.delay);

  return (
    <Message className="tyk-toast__message" theme={opts.theme}>
      <Button
        className="tyk-toast-message__button"
        iconOnly
        iconType="times"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={handleClose.bind(null, index)}
      />
      {children}
    </Message>
  );
};

ToastMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  options: PropTypes.instanceOf(Object),
  onClose: PropTypes.func,
  index: PropTypes.number,
};

export default ToastMessage;
