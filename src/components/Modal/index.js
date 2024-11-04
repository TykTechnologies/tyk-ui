import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Icon from '../Icon';
import ModalFooter from './js/ModalFooter';
import ModalBody from './js/ModalBody';
import ModalHeader from './js/ModalHeader';
import ModalTitle from './js/ModalTitle';

/**
 * Modals add dialogs confirmation boxes, notifications, or completely custom content
 * - only one Modal can be opened at a time
 * - are unmounted when Modal is closed
 */
function Modal({
  children,
  theme: themeProp = 'default',
  disableCloseCommands = false,
  opened = false,
  onClose,
  size = 'md',
  className = '',
  showBackdrop = true,
  ...restProps
}) {
  const theme = ['success', 'warning', 'danger', 'info'].includes(themeProp) ? themeProp : 'default';
  const modalClasses = [
    'tyk-modal',
    `tyk-modal--theme-${theme}`,
    opened && 'opened',
  ].concat(className.split(' ')).filter(Boolean).join(' ');

  const themeIcon = {
    info: 'circle-info',
    success: 'hexagon-check',
    warning: 'triangle-exclamation',
    danger: 'hexagon-exclamation',
  }[theme];

  const backdropClasses = [
    'tyk-modal__backdrop',
    opened && 'opened',
  ].filter(Boolean).join(' ');

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
                  {themeIcon && (
                    <Icon type={themeIcon} weight="solid" className="tyk-modal__theme-icon" />
                  )}
                  { children }
                  {!disableCloseCommands && onClose && (
                    <Icon type="xmark" className="tyk-modal__close-icon" onClick={onClose} />
                  )}
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
            onClick={() => !disableCloseCommands && onClose?.()}
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

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.element,
    PropTypes.node,
    PropTypes.string,
  ]),
  className: PropTypes.string,
  /** one of "success", "warning", "danger", "info", "default"; default is "default" */
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

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
