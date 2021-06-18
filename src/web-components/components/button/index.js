const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    .tyk-button {
      background-color: transparent;
      border: none;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-family: var(--tyk-button-font-family);
      text-align: center;
      text-transform: uppercase;
      text-decoration: none;
      transition: all .2s linear;
      user-select: none;
      vertical-align: middle;
      white-space: nowrap;

      padding: var(--tyk-padding-y-button-md) var(--tyk-padding-x-button-md);
      font-size: var(--tyk-text-sm-font-size);
      line-height: var(--tyk-line-height-button-md);
      border-radius: var(--tyk-button-border-radius);
    }

    .tyk-buton.disabled {
      cursor: not-allowed;
      opacity: 0.7;
    }

    .tyk-button:hover {
      color: white;
      text-decoration: none;
    }

    .tyk-button:focus {
      outline: none;
    }

    .theme--primary {
      background-color: var(--tyk-button-primary-color);
      color: var(--tyk-button-primary-text-color);
      border: var(--tyk-general-border-width) solid var(--tyk-button-primary-color);
    }
    .theme--primary:hover {
      background-color: var(--tyk-button-primary-hover-color);
      color: var(--tyk-button-primary-text-color);
    }
  </style>
`;

class Button extends HTMLElement {
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

    this.sroot = this.attachShadow({ mode: 'open' });
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
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render();
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
      this.theme && `theme--${this.theme}`,
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

    // elem.append(...this.children);
    elem.innerHTML = '<div><slot name="left-icon"></slot><slot></slot><slot name="right-icon"></slot></div>';
    elem.setAttribute('disabled', this.disabled);
    elem.addEventListener('click', () => {
      console.log('wtf');
    });

    elem.classList.remove(...elem.classList);
    elem.classList.add(...this.getClasses());
  }
}

customElements.define('tyk-button', Button);
