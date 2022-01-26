import { LitElement, html, css } from 'lit';

import "@polymer/paper-input/paper-input.js";
import "@vaadin/date-picker";
import "@polymer/paper-button/paper-button.js";
import "@vaadin/text-area";

export class FormComponent extends LitElement {
    static get styles() {
        return css`

            .form {
                width: 30%;
                padding: 2% 2%;
                background-color: white;
                margin: 0 auto;
                border-radius: 20px;
            }

            .form-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .form-header img {
                width: 16px;
                cursor: pointer;
            }

            .form-header p {
                font-size: 28px;
                font-weight: lighter;
                margin: 0;
            }

            .form-row {
                display: flex;
                justify-content: space-between;
            }

            .form-row paper-input {
                width: 48%;
            }

            vaadin-date-picker, vaadin-text-area {
                width: 100%;
                background-color: white;
            }

            .binding-group-row p {
                color: grey;
                font-size: 14px;
            }

            .group-container {
                height: 120px;
                border: solid 1px grey;
                border-radius: 4px;
                padding: 5px;
                overflow-y: scroll;
            }

            .form-footer {
                padding-top: 5%;
            }

            .create-button {
                background-color: #E91E62;
                color: white;
                border-radius: 5px;
                font-weight: bold;
                margin: 0;
                cursor: pointer;
            }

            .cancel-button {
                color: #616161;
                font-weight: bold;
                margin: 0;
                margin-left: 5px;
                cursor: pointer;
            }
        `;
    }

    static get properties() {
        return {
            addToData: { type: Function },
        };
    }

    /**
     * Constructor of the class.
     */
    constructor() {
        super();

        this.bindingGroups = [
            "BRD2 Affinity_High_Affinity",
            "BRD2 AMP_PNP_competitive",
            "BRD@ NRX-0459676_non-competitive",
            "BRD@ test-1",
            "BRD@ test-2",
            "BRD@ test-3",
            "BRD@ test-4",
        ];

        this.inputData = {
            name: "",
            ligandsPromoted: 0,
            description: "",
            totalLigands: 0,
            date: "",
            bindingGroups: [],
            comments: ""
        };

        this.addToData = () => {};
    }

    /**
     * Renders the component.
     * 
     * @returns {HTMLElement} - HTML of the components
     */
    render() {
        return html`
            <div class="form">
                <div class="form-header">
                    <p>Create Binding Group</p>
                    <img src="./images/cross.png" alt="cross-icon" @click=${this.hideForm}>
                </div>
                <div class="form-row">
                    <paper-input 
                        label="Name" 
                        @keyup=${this.updateName}
                        required 
                        auto-validate
                        error-message="Please enter a name"
                        ></paper-input>
                    <paper-input 
                        label="Ligands Promoted" 
                        @keyup=${this.updateLigandsPromoted}
                        required 
                        auto-validate
                        pattern="[0-9]*"
                        error-message="Please enter number of ligands promoted"
                    ></paper-input>
                </div>
                <div class="form-row">
                    <paper-input 
                        label="Description" 
                        @keyup=${this.updateDescription}
                        required 
                        auto-validate
                        error-message="Please enter description"
                    ></paper-input>
                    <paper-input 
                        label="Total Ligands in Binding Group" 
                        @keyup=${this.updateTotalLigands}
                        required 
                        auto-validate
                        pattern="[0-9]*"
                        error-message="Please enter number of total ligands"
                    ></paper-input>
                </div>
                <div class="form-row">
                    <vaadin-date-picker 
                        label="Date" 
                        @change=${this.updateDate}
                    ></vaadin-date-picker>
                </div>
                <div class="binding-group-row">
                    <p>Binding Group</p>
                    <div class="group-container">
                        ${this.bindingGroups.map((group, index) => html`
                            <binding-group-component
                                .pos=${index}
                                .text=${group}
                                .addBindingGroup=${this.addBindingGroup}
                                .deleteBindingGroup=${this.deleteBindingGroup}
                            ></binding-group-component>
                        `)}
                    </div>
                </div>
                <div class="form-row">
                    <vaadin-text-area 
                        label="Comments" 
                        @keyup=${this.updateComments}
                    ></vaadin-text-area>
                </div>
                <div class="form-footer">
                    <paper-button class="create-button" raised @click=${() => this.addToData(this.inputData)}>CREATE</paper-button>
                    <paper-button class="cancel-button" @click=${this.hideForm}>CANCEL</paper-button>
                </div>
            </div>
        `;
    }

    updateName = e => this.inputData.name = e.target.value;

    updateLigandsPromoted = e => this.inputData.ligandsPromoted = parseInt(e.target.value);

    updateDescription = e => this.inputData.description = e.target.value;

    updateTotalLigands = e => this.inputData.totalLigands = parseInt(e.target.value);

    updateDate = e => this.inputData.date = e.target.value;

    updateComments = e => this.inputData.comments = e.target.value;

    addBindingGroup = groupToAdd => this.inputData.bindingGroups.push(groupToAdd);

    deleteBindingGroup = groupToDelete => this.inputData.bindingGroups = this.inputData.bindingGroups.filter(group => group !== groupToDelete);

    hideForm = () => this.style.display = "none";
}

customElements.define("form-component", FormComponent);
