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
    this.defaultOptions = {};
    this.themeOptions = {};
    const el = document.createElement('div');
    el.className = 'tyk-toast';
    document.body.appendChild(el);
    const root = createRoot(el);
    root.render(<ToastContainer notify={this.bindNotify} />);
  }

  bindNotify = (fn) => {
    this.createNotification = fn;
  };

  configure(options) {
    const { themes = {}, general = {} } = options

    this.defaultOptions = { ...this.defaultOptions, ...general }
    Object.keys(themes).forEach(theme => {
      this.themeOptions[theme] = {
        ...(this.themeOptions[theme] || {}),
        ...themes[theme]
      }
    })
  }

  notify(message, options) {
    const themeDefaults = this.themeOptions[options.theme] || {}
    const finalOptions = { ...this.defaultOptions, ...themeDefaults, ...options };

    if (this.createNotification) {
      this.createNotification(message, finalOptions)
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
