import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import "@polymer/paper-checkbox/paper-checkbox.js";

export class BindingGroupComponent extends LitElement {
    static get styles() {
        return css`
            .greyBackground {
                background-color: lightgray;
            }

            .group {
                padding: 10px;
                border-radius: 3px;
            }
        `;
    }

    static get properties() {
        return {
            pos: { type: Number },
            text: { type: String },
            addBindingGroup: { type: Function },
            deleteBindingGroup: { type: Function },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.pos = 0;

        this.text = ""

        this.addBindingGroup = () => {};
        this.deleteBindingGroup = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {HTMLElement} - HTML of the components
     */
    render() {
        const classes = { group: true, greyBackground: this.pos%2===0}
        return html`
            <div class=${classMap(classes)}>
                <paper-checkbox @click=${this.onGroupClick}>${this.text}</paper-checkbox>
            </div>
        `;
    }

    onGroupClick = e => {
        if(e.target.checked)
            this.addBindingGroup(this.text);
        else
            this.deleteBindingGroup(this.text);
    }
}

customElements.define("binding-group-component", BindingGroupComponent);
