import { LightningElement, api } from 'lwc';

export default class LightningInputRichText extends LightningElement {
    @api label = ''; // Label for the editor
    @api value = ''; // Initial rich text content
    @api cssclass = ''; // Custom CSS classes passed from the parent component

    uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`; // Unique ID for accessibility

    // Compute dynamic class for the editor container
    get dynamicClass() {
        const baseClass = 'slds-rich-text-editor';
        return `${baseClass} ${this.cssclass}`.trim();
    }

    renderedCallback() {
        const editorContainer = this.template.querySelector(`.${this.dynamicClass}`);
        if (!editorContainer.getAttribute('data-initialized')) {
            // Initialize Quill.js or any WYSIWYG library
            this.initializeEditor(editorContainer);
        }
    }

    initializeEditor(editorContainer) {
        // Use Quill.js (or similar) to initialize the editor
        const Quill = window.Quill || null; // Ensure Quill.js is available
        if (Quill) {
            const editor = new Quill(editorContainer, {
                theme: 'snow',
            });

            // Set the initial value
            editor.root.innerHTML = this.value;

            // Handle changes
            editor.on('text-change', () => {
                const value = editor.root.innerHTML;
                this.handleValueChange(value);
            });

            editorContainer.setAttribute('data-initialized', 'true');
        } else {
            console.error('Quill.js is not loaded!');
        }
    }

    handleValueChange(newValue) {
        // Dispatch a custom event to notify the parent of changes
        const changeEvent = new CustomEvent('change', {
            detail: { value: newValue },
        });
        this.dispatchEvent(changeEvent);
    }
}
