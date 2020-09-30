import React from 'react';
import ReactDOM from 'react-dom';
import ToastContainer from './js/ToastContainer';

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
