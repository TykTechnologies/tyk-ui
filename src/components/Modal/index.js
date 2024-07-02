import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Icon from '../Icon';
import ModalFooter from './js/ModalFooter';
import ModalBody from './js/ModalBody';

/**
 * Modals add dialogs confirmation boxes, notifications, or completely custom content
 * - only one Modal can be opened at a time
 * - are unmounted when Modal is closed
 */
function Modal({
  children,
  theme = 'none',
  disableCloseCommands = false,
  opened = false,
  onClose = () => {},
  size = 'md',
  className = '',
  showBackdrop = true,
  ...restProps
}) {
  const modalClasses = [
    'tyk-modal',
    `tyk-modal--theme-${theme}`,
    opened && 'opened',
  ].concat(className.split(' ')).filter(Boolean).join(' ');

  const backdropClasses = [
    'tyk-modal__backdrop',
    opened && 'opened',
  ].filter(Boolean).join(' ');

  const themeIcon = {
    success: 'check',
    warning: 'exclamation',
    danger: 'exclamation',
  }[theme];

  return (
    <>
      {
        ReactDOM.createPortal(
          <CSSTransition
            in={opened}
            timeout={100}
            classNames="appear"
          >
            <div className={modalClasses} {...restProps}>
              <div className={`tyk-modal__dialog tyk-modal--${size}`}>
                <div className="tyk-modal__content">
                  {theme !== 'none' && (
                    <div className="tyk-modal__theme-header">
                      <Icon type={themeIcon} />
                    </div>
                  )}
                  { children }
                </div>
              </div>
            </div>
          </CSSTransition>,
          document.querySelector('body'),
        )
      }
      {showBackdrop && ReactDOM.createPortal(
        <CSSTransition
          in={opened}
          timeout={100}
          classNames="fade"
        >
          <button
            className={backdropClasses}
            onClick={() => !disableCloseCommands && onClose()}
            onKeyDown={() => {}}
            type="button"
            aria-label="Close"
          />
        </CSSTransition>,
        document.querySelector('body'),
      )}
    </>
  );
}

Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
/* eslint-disable-next-line */
Modal.Header = ({ children }) => {
  console.warn('%cModal.Header%c is deprecated.', 'font-weight: bold', '');
  return (
    <div className="tyk-modal__header">
      { children }
    </div>
  );
};
Modal.Header.propTypes = {
  children: PropTypes.element,
};
/* eslint-disable-next-line */
Modal.Title = ({ children }) => {
  console.warn('%cModal.Title%c is deprecated.', 'font-weight: bold', '');
  return (
    <h5 className="tyk-modal__title">
      { children }
    </h5>
  );
};
Modal.Title.propTypes = {
  children: PropTypes.element,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  /** one of "success", "warning", "danger", "none"; default is "none" */
  theme: PropTypes.string,
  /** If set on true, the Modal won't close when clicking on the overlay or by pressing ESC key */
  disableCloseCommands: PropTypes.bool,
  /** If true the Modal will be by default opened */
  opened: PropTypes.bool,
  /** Callback method when the Modal is closed */
  onClose: PropTypes.func,
  /** Width of the Moda: md or lg */
  size: PropTypes.string,
  showBackdrop: PropTypes.bool,
};

export default Modal;
