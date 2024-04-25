import React from 'react';
import { createRoot } from 'react-dom/client';
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
    const root = createRoot(el);
    root.render(<ToastContainer notify={this.bindNotify} />);
  }

  bindNotify = (fn) => {
    this.createNotification = fn;
  };

  notify(message, options) {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  }

  danger(message, options) {
    this.notify(message, { ...options, theme: 'danger' });
  }

  success(message, options) {
    this.notify(message, { ...options, theme: 'success' });
  }

  warning(message, options) {
    this.notify(message, { ...options, theme: 'warning' });
  }

  info(message, options) {
    this.notify(message, { ...options, theme: 'info' });
  }
}

const toast = new ToastCreator();

export default toast;
