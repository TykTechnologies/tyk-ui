import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../../Button';
import Modal from '../../Modal';

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

  const show = callbackFunc => (...args) => {
    setOpen(true);
    setCallback(() => () => callbackFunc(...args));
  };

  const hide = () => {
    setOpen(false);
    setCallback(null);
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
        onClose={hide}
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
            onClick={hide}
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
