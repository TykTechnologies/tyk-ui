import styles from './button.wc.css';

const template = document.createElement('template');
template.innerHTML = `<style>${styles}</style>`;

class Button extends HTMLElement {
  static get formAssociated() { return true; }

  static get observedAttributes() {
    return [
      'classname',
      'display',
      'disabled',
      'href',
      'noStyle',
      'theme',
      'type',
      'size',
    ];
  }

  constructor() {
    super();

    this.internals = this.attachInternals();
    this.sroot = this.attachShadow({ mode: 'closed' });
    this.sroot.append(template.content.cloneNode(true));
  }

  get display() { return this.getAttribute('display'); }
  set display(val) { this.setAttribute('display', val); }

  get disabled() { return this.getAttribute('disabled'); }
  set disabled(val) { this.setAttribute('disabled', val); }

  get href() { return this.getAttribute('href'); }
  set href(val) { this.setAttribute('href', val); }

  get noStyle() { return this.getAttribute('noStyle'); }
  set noStyle(val) { this.setAttribute('noStyle', val); }

  get theme() { return this.getAttribute('theme'); }
  set theme(val) { this.setAttribute('theme', val); }

  get type() { return this.getAttribute('type'); }
  set type(val) { this.setAttribute('type', val); }

  get size() { return this.getAttribute('size'); }
  set size(val) { this.setAttribute('size', val); }

  connectedCallback() {
    this.render();

    this.addEventListener('click', this.maybeSubmit);

    this.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.maybeSubmit();
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) this.render();
  }

  maybeSubmit() {
    if (this.type === 'submit' && this.internals.form) {
      this.internals.form.requestSubmit();
    }
  }

  getClasses() {
    const has = selector => Boolean(this.sroot.querySelector(selector)?.assignedNodes?.()?.length);
    const hasContent = has('slot:nth-child(2)');
    const hasLeftIcon = has('[name="left-icon"]');
    const hasRightIcon = has('[name="right-icon"]');
    const hasIcon = hasLeftIcon || hasRightIcon;

    return [
      'tyk-button',
      ...(this.classname ? this.classname.split(' ') : []),
      this.size ? `size--${this.size}` : 'size--md',
      this.disabled && 'disabled',
      this.display,
      ...(this.theme ? this.theme.split(' ').map(t => `theme--${t}`) : []),
      !hasContent && 'icon-only',
      hasIcon && `icon-${hasRightIcon ? 'right' : 'left'}`,
      this.noStyle && 'no-style',
    ].filter(Boolean);
  }

  render() {
    const anchor = this.sroot.querySelector('a');
    const button = this.sroot.querySelector('button');
    let elem;

    Array.from(this.children).slice(1).forEach((ch) => { ch.style.marginLeft = '5px'; }); // eslint-disable-line

    if (this.href) {
      if (anchor) {
        elem = anchor;
      } else {
        if (button) this.sroot.removeChild(button);
        const newA = document.createElement('a');
        this.sroot.append(newA);
        elem = newA;
      }
      elem.setAttribute('href', this.href);
    } else {
      if (button) {
        elem = button;
      } else {
        if (anchor) this.sroot.removeChild(anchor);
        const newButton = document.createElement('button');
        this.sroot.append(newButton);
        elem = newButton;
      }
      elem.setAttribute('type', this.type ?? 'button');
    }

    elem.innerHTML = '<div><slot name="left-icon"></slot><slot></slot><slot name="right-icon"></slot></div>';

    this.tabIndex = this.getAttribute('tabindex') ?? 0;

    if (this.disabled) elem.setAttribute('disabled', true);
    else elem.removeAttribute('disabled');

    elem.classList.remove(...elem.classList);
    elem.classList.add(...this.getClasses());
  }
}

customElements.define('tyk-button', Button);
