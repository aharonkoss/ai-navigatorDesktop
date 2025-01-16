import { LightningElement, api } from 'lwc';

export default class LightningFormattedRichText extends LightningElement {
    @api value = ''; // Rich text value
    @api cssclass = ''; // Custom CSS class passed from the parent component

    // Compute dynamic class for the container
    get dynamicClass() {
        const baseClass = 'slds-rich-text';
        return `${baseClass} ${this.cssclass}`.trim();
    }

    renderedCallback() {
        // Dynamically set the rich text content
        const container = this.template.querySelector('div');
        if (container) {
            container.innerHTML = this.value;
        }
    }
}
