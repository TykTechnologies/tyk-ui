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
    opened: this.props.opened || false,
    shouldOpen: false
  };

  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let state = {};

    if(nextProps.opened !== prevState.opened) {
      state.opened = nextProps.opened;
      state.shouldOpen = nextProps.opened;

      return state;
    }

    return null;
  }

  componentDidMount() {
    this.setState({
      shouldOpen: this.props.opened
    });
  }

  closeModal() {
    const { onClose } = this.props;

    this.setState({
      opened: false,
      shouldOpen: false
    });

    if(onClose && typeof onClose === 'function') {
      onClose();
    }
  }

  getModalSize() {
    const { size } = this.props;

    return 'tyk-modal--' + (size || 'md');
  }

  getCssClasses() {
    const { opened } = this.state;
    let cssClasses = ['tyk-modal'];

    if(opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  getBackdropCssClasses() {
    const { opened } = this.state;
    let cssClasses = ['tyk-modal__backdrop'];

    if(opened) {
      cssClasses.push('opened');
    }

    return cssClasses.join(' ');
  }

  render() {
    const { opened, shouldOpen } = this.state;

    return (
      <Fragment>
        {
          ReactDOM.createPortal(
            <CSSTransition
              in={ shouldOpen }
              timeout={ 0 }
              classNames="appear"
            >
              <div className={ this.getCssClasses() }>
                <div className={ "tyk-modal__dialog " + this.getModalSize() }>
                  <div className="tyk-modal__content">
                    <ModalContext.Provider
                      value={{
                        opened: this.state.opened,
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
              in={ shouldOpen }
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
