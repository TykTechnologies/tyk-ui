import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import Modal from '../Modal';

const Confirm = (props) => {
  const {
    children,
    title,
    description,
    confirmBtnText = 'Confirm',
    cancelBtnText = 'Cancel',
  } = props;
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(null);
  const [cancelCallback, setCancelCallback] = useState(null);

  const show = (callbackFunc, cancelCallbackFunc, beforeCallback) => (...args) => {
    if (beforeCallback) {
      beforeCallback(...args);
    }
    setOpen(true);
    setCallback(() => () => callbackFunc(...args));
    if (cancelCallback) {
      setCancelCallback(() => () => cancelCallbackFunc(...args));
    }
  };

  const hide = () => {
    setOpen(false);
    setCallback(null);
    setCancelCallback(null);
  };

  const cancel = () => {
    if (cancelCallback) {
      cancelCallback();
    }
    hide();
  };

  const confirm = () => {
    callback();
    hide();
  };

  return (
    <>
      {children(show)}
      <Modal
        opened={open}
        onClose={cancel}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {description}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={confirm}
            theme="success"
          >
            {confirmBtnText}
          </Button>
          <Button
            onClick={cancel}
            theme="default"
          >
            {cancelBtnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

Confirm.propTypes = {
  confirmBtnText: PropTypes.string,
  cancelBtnText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
};

export default Confirm;
