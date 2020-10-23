import React from 'react';
import ReactDOM from 'react-dom';
import ToastContainer from './js/ToastContainer';
/**
 * Toast is a service that displays dialogs
 * on the bottom right part of the screen.
 *
 * The dialogs can have one of the Tyk UI themes, so that
 * it would match it's purpose (i.e success message, error message)
 *
 */
class ToastCreator {
  constructor() {
    const el = document.createElement('div');
    el.className = 'tyk-toast';
    document.body.appendChild(el);
    ReactDOM.render(<ToastContainer notify={this.bindNotify} />, el);
  }

  bindNotify = (fn) => {
    this.createNotification = fn;
  };

  notify(message, options) {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  }
}

const toast = new ToastCreator();

export default toast;
