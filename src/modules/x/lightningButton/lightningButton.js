import { LightningElement, api } from 'lwc';

export default class LightningButton extends LightningElement {
    @api label = ''; // Button label
    @api variant = 'neutral'; // Button variant (e.g., neutral, brand)
    @api cssclass = ''; // Custom CSS classes passed from the parent component

    // Compute dynamic class for the button
    get dynamicClass() {
        const baseClass = `slds-button slds-button_${this.variant}`;
        return `${baseClass} ${this.cssclass}`.trim();
    }

    // Handle button click
    handleClick(event) {
        // Dispatch a custom event to notify the parent
        this.dispatchEvent(new CustomEvent('click', { detail: { event } }));
    }
}
