import { LightningElement, api, track } from 'lwc';

export default class LightningCombobox extends LightningElement {
    @api label = 'Select an Option'; // Label for the combobox
    @api placeholder = 'Choose an option'; // Placeholder for the input
    @api options = []; // Array of { label: string, value: string }
    @api defaultValue = ''; // Default value for the combobox

    @track isDropdownOpen = false; // Tracks dropdown visibility
    @track searchTerm = ''; // Tracks input value
    @track activeDescendant = null; // For accessibility

    connectedCallback() {
        // Set the default value if provided
        const defaultOption = this.options.find(option => option.value === this.defaultValue);
        if (defaultOption) {
            this.searchTerm = defaultOption.label; // Pre-fill the input with the label
        }
    }

    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    handleInput(event) {
        this.searchTerm = event.target.value;
        this.filterOptions();
    }

    handleSelect(event) {
        const value = event.currentTarget.dataset.value;
        const selectedOption = this.options.find(option => option.value === value);
        if (selectedOption) {
            this.searchTerm = selectedOption.label;
            this.isDropdownOpen = false;

            // Dispatch the selected value
            this.dispatchEvent(new CustomEvent('change', { detail: { value } }));
        }
    }

    filterOptions() {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        this.options = this.options.map(option => ({
            ...option,
            isVisible: option.label.toLowerCase().includes(lowerSearchTerm),
        }));
    }
}
