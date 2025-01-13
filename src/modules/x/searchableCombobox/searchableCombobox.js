import { LightningElement, api, track } from 'lwc';

export default class SearchableCombobox extends LightningElement {
    @api options = []; // Array of options [{ label: 'Option 1', value: '1' }, ...]
    @track filteredOptions = [];
    @track searchTerm = '';
    @track showOptions = false;

    connectedCallback() {
        this.filteredOptions = this.options;
    }

    handleSearchChange(event) {
        this.searchTerm = event.target.value.toLowerCase();
        this.filterOptions();
    }

    filterOptions() {
        if (this.searchTerm) {
            this.filteredOptions = this.options.filter(option =>
                option.label.toLowerCase().includes(this.searchTerm)
            );
        } else {
            this.filteredOptions = this.options;
        }
        this.showOptions = this.filteredOptions.length > 0;
    }

    handleOptionSelect(event) {
        const selectedValue = event.currentTarget.dataset.value;
        this.dispatchEvent(
            new CustomEvent('optionselect', {
                detail: { value: selectedValue },
            })
        );
        this.searchTerm = this.options.find(
            option => option.value === selectedValue
        ).label;
        this.showOptions = false;
    }
}
