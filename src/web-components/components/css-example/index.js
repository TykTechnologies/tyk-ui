import styles from './styles.css' assert { type: 'css' };

const template = document.createElement('template');
template.innerHTML = `
  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet ante id mi interdum laoreet. Fusce ac nibh libero. Praesent ultricies non lacus eget rhoncus.</p>
    <a href="https://tyk.io">tyk</a>
  </div>
`;

class CSSExample extends HTMLElement {
  constructor() {
    super();

    this.sroot = this.attachShadow({ mode: 'closed' });
    this.sroot.append(template.content.cloneNode(true));
    this.sroot.adoptedStyleSheets = [styles];
  }
}

customElements.define('css-example', CSSExample);
