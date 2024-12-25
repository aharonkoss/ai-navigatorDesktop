import { LightningElement, api, track } from 'lwc';

export default class RadioGroup extends LightningElement {
    @api label = ''; // Label for the radio group
    @api name = 'radio-group'; // Name for the radio buttons
    @track checkedOptions = []; // Array of { label: string, value: string, isChecked: boolean }
    @api value = ''; // Currently selected value
    @api options=[]; //Array passed in
    @api iconurl='';
    connectedCallback() {
        const thisValue=this.value;
        console.log('set options: thisvalue==>'+thisValue);
        this.options = this.options.map(option => ({
            ...option,
            isChecked: option.value==thisValue?true:false,
        }));
    }
    get stringOptions() {
        return JSON.stringify(this.checkedOptions)+' value:'+this.value;
    }
    
    handleChange(event) {
        const selectedValue = event.target.value;
        this.value = selectedValue;

        // Update isChecked for options
        this.options = this.options.map(option => ({
            ...option,
            isChecked: option.value === this.value,
        }));

        // Dispatch a custom event with the selected value
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: { value: selectedValue },
            })
        );
    }
}

