import { LightningElement, api, track } from 'lwc';

export default class LightningInput extends LightningElement {
    @api label = ''; // Label for the input
    @api placeholder = ''; // Placeholder text (for text inputs only)
    @api type = 'text'; // Type of input: 'text' or 'checkbox'
    @api value = ''; // Current value of the input
    @api checked = false; // For checkbox: whether it's checked or not
    @api cssclass='';
    @api error = ''; // Error message (if any)
    @track uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for the input

    // Computed properties for input type checks
    get isTextType() {
        return this.type.toLowerCase() === 'text';
    }

    get isCheckboxType() {
        return this.type.toLowerCase() === 'checkbox';
    }

    // Handle input change event
    handleChange(event) {
        const value = this.isCheckboxType ? event.target.checked : event.target.value;

        // Dispatch custom event with the updated value or checked state
        const inputEvent = new CustomEvent('change', {
            detail: { value },
        });
        this.dispatchEvent(inputEvent);
    }
}

