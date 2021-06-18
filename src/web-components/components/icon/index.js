class Icon extends HTMLElement {
  static get observedAttributes() {
    return ['classname', 'family', 'type'];
  }

  connectedCallback() {
    this.updateClasses();
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal !== newVal) {
      this[name] = newVal;
      if (this.type) this.updateClasses();
    }
  }

  updateClasses() {
    const fontFamily = this.family ?? 'fa';
    const classes = ['tyk-icon', fontFamily, `${fontFamily}-${this.type}`];
    if (this.classname) classes.concat(this.classname.split(' '));

    this.classList.remove(...this.classList);
    this.classList.add(...classes);
  }
}

customElements.define('tyk-icon', Icon);
