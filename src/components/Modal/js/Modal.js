import React, { Component, Fragment, createContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import '../sass/Modal.scss';
const ModalContext = createContext();

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
      PropTypes.string
    ]),
    opened: PropTypes.bool,
    onClose: PropTypes.func,
    size: PropTypes.string
  };

  state = {
    initialOpenedState: false
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { onClose } = this.props;

    if(onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  getModalSize() {
    const { size } = this.props;

    return 'tyk-modal--' + (size || 'md');
  }

  getCssClasses() {
    const { opened } = this.props;
    let cssClasses = ['tyk-modal'];

    if(opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  getBackdropCssClasses() {
    const { opened } = this.props;
    let cssClasses = ['tyk-modal__backdrop'];

    if(opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  render() {
    const { opened } = this.props;
    
    return (
      <Fragment>
        {
          ReactDOM.createPortal(
            <CSSTransition
              in={ opened }
              timeout={ 100 }
              classNames="appear"
            >
              <div className={ this.getCssClasses() }>
                <div className={ "tyk-modal__dialog " + this.getModalSize() }>
                  <div className="tyk-modal__content">
                    <ModalContext.Provider
                      value={{
                        opened,
                        closeModal: this.closeModal
                      }}
                    >
                      { this.props.children }
                    </ModalContext.Provider>
                  </div>
                </div>
              </div>
            </CSSTransition>,
            document.querySelector('body')
          )
        }
        {
          ReactDOM.createPortal(
            <CSSTransition
              in={ opened }
              timeout={ 100 }
              classNames="fade"
            >
              <div
                className={ this.getBackdropCssClasses() }
                onClick={ this.closeModal }
              >
              </div>
            </CSSTransition>,
            document.querySelector('body')
          )
        }
      </Fragment>
    );
  }
}

export { ModalContext };
