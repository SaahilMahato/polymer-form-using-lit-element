import { LitElement, html, css } from 'lit';

export class AppComponent extends LitElement {
  static get styles() {
    return css`
      .container {
        width: 100%;
        height: 100%;
      }

      .container img {
        width: 96px;
        margin: 25px;
        margin-bottom: 0;
        cursor: pointer;
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
        <img src="./images/add.png" alt="show form" @click=${this.showForm}>
        <form-component .addToData=${this.addToData}></form-component>
      </div>
    `;
  }

  addToData = (receivedData) => {
    this.data = [...this.data, receivedData];
    console.log(this.data);
  }

  showForm = () => this.shadowRoot.querySelector("form-component").style.display = "block";
}

customElements.define('app-component', AppComponent);
