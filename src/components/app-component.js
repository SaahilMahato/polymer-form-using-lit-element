import { LitElement, html, css } from 'lit';

export class AppComponent extends LitElement {
  static get styles() {
    return css`
      .container {
        width: 100%;
        height: 100%;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Array },
    };
  }

  constructor() {
    super();

    this.data = [];
  }

  render() {
    return html`
      <div class="container">
        <form-component .addToData=${this.addToData}></form-component>
      </div>
    `;
  }

  addToData = (receivedData) => {
    this.data = [...this.data, receivedData];
    console.log(this.data);
  }
}

customElements.define('app-component', AppComponent);
