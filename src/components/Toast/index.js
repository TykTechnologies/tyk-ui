import React from 'react';
import { createRoot } from 'react-dom/client';
import ToastContainer from './js/ToastContainer';

const VALID_FROM = ["bottom", "top"]
const VALID_ALIGN = ["right", "center"]

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
    this.placement = { from: 'bottom', align: 'center' };

    const el = document.createElement('div');
    el.className = 'tyk-toast';
    document.body.appendChild(el);
    this.root = createRoot(el);

    this.renderContainer();
  }

  renderContainer() {
    this.root.render(
      <ToastContainer
        placement={this.placement}
        notify={this.bindNotify}
      />
    );
  }

  bindNotify = (fn) => {
    this.createNotification = fn;
  };

  configure(options = {}) {
    const { themes = {}, general = {} } = options

    this.defaultOptions = { ...this.defaultOptions, ...general }
    Object.keys(themes).forEach(theme => {
      this.themeOptions[theme] = {
        ...(this.themeOptions[theme] || {}),
        ...themes[theme]
      }
    })

    const { placement = {} }  = general;

    let from = placement.from || this.placement.from;
    if (!VALID_FROM.includes(from)) {
      console.warn(`[Tyk UI Toast] Invalid placement.from: "${from}". Allowed values are: ${VALID_FROM.join(', ')}. Falling back to "bottom".`);
      from = "bottom";
    }

    let align = placement.align || this.placement.align;
    if (!VALID_ALIGN.includes(align)) {
      console.warn(`[Tyk UI Toast] Invalid placement.align: "${align}". Allowed values are: ${VALID_ALIGN.join(', ')}. Falling back to "center".`);
      align = "center";
    }

    let shouldRerender = false

    if (from !== this.placement.from || align !== this.placement.align) {
      this.placement = { from, align };
      shouldRerender = true
    }

    if (shouldRerender) {
      // Using setTimeout to avoid the React "triggering nested component updates" warning
      setTimeout(() => this.renderContainer(), 0);
    }
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
