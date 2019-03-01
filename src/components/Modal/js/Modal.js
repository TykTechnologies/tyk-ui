import React, { Component, Fragment, createContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const ModalContext = createContext();

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string,
    ]),
    opened: PropTypes.bool,
    onClose: PropTypes.func,
    size: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  getBackdropCssClasses() {
    const { opened } = this.props;
    const cssClasses = ['tyk-modal__backdrop'];

    if (opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  getCssClasses() {
    const { opened } = this.props;
    const cssClasses = ['tyk-modal'];

    if (opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  getModalSize() {
    const { size } = this.props;

    return `tyk-modal--${size || 'md'}`;
  }

  closeModal() {
    const { onClose } = this.props;

    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  render() {
    const { children, opened } = this.props;

    return (
      <Fragment>
        {
          ReactDOM.createPortal(
            <CSSTransition
              in={opened}
              timeout={100}
              classNames="appear"
            >
              <div className={this.getCssClasses()}>
                <div className={`tyk-modal__dialog ${this.getModalSize()}`}>
                  <div className="tyk-modal__content">
                    <ModalContext.Provider
                      value={{
                        opened,
                        closeModal: this.closeModal,
                      }}
                    >
                      { children }
                    </ModalContext.Provider>
                  </div>
                </div>
              </div>
            </CSSTransition>,
            document.querySelector('body'),
          )
        }
        {
          ReactDOM.createPortal(
            <CSSTransition
              in={opened}
              timeout={100}
              classNames="fade"
            >
              <button
                className={this.getBackdropCssClasses()}
                onClick={this.closeModal}
                onKeyDown={() => {}}
                type="button"
              />
            </CSSTransition>,
            document.querySelector('body'),
          )
        }
      </Fragment>
    );
  }
}

export { ModalContext };
