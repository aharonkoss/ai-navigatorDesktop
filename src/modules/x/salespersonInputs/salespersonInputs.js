import { LightningElement, api, track } from 'lwc';
//import createMeetingPreparation from '@salesforce/apex/OrnatePanelController.createMeetingPreparation';
//import getMeetingPreparation from '@salesforce/apex/OrnatePanelController.getMeetingPreparation';

export default class SalespersonInputs extends LightningElement {
    @track formData = {
        meetingId : null,
        meetingDate: null,
        meetingLocation: '',
        clientName: '',
        contactName: '',
        isNewClient: false,
        minGoal: '',
        maxGoal: '',
        valueAddedCallPurpose: '',
        additionalNotes: ''
    };
    @track showThankYouMessage = false;
    @api meetingid;

    connectedCallback(){

        console.log('this.meetingid - ', this.meetingid);
        if(this.meetingid && this.meetingid.length > 0){
            getMeetingPreparation({ 
                meetingId: this.meetingid 
            }).then(result => {
                console.log(result);
                let frmData = {};
                frmData.meetingId = result.Id;
                frmData.meetingDate = result.Meeting_Date__c,
                frmData.meetingLocation = result.Meeting_Location__c ? result.Meeting_Location__c : '',
                frmData.clientName = result.Client__c ? result.Client__c : '',
                frmData.contactName = result.Client_Contact__c ? result.Client_Contact__c : '',
                frmData.isNewClient = result.Is_New_Client__c,
                frmData.minGoal = result.Minimum_Goal__c ? result.Minimum_Goal__c : '',
                frmData.maxGoal = result.Maximum_Goal__c ? result.Maximum_Goal__c : '',
                frmData.valueAddedCallPurpose = result.Value_Added_Call_Purpose__c ? result.Value_Added_Call_Purpose__c : '',
                frmData.additionalNotes = result.Additional_Notes__c ? result.Additional_Notes__c : ''

                this.formData = {...frmData};
                console.log(JSON.stringify(this.formData));
            })
            .catch(error => {
                console.error(error);
            })
        }
    }

    @api
    initialize() {
        alert(`api initialize() starting.....`)
        this.resetForm();
    }

    handleInputChange(event) {
        const field = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.formData[field] = value;
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        console.log('Submitting form data:', JSON.stringify(this.formData));
    
        try {
            const result = await createMeetingPreparation({ formData: this.formData });
            this.formData['meetingId'] = result;
            console.log('Meeting Preparation record created with Id:', result);
            this.showThankYouMessage = true;
            console.log('Thank you message should be shown now');
            this.dispatchEvent(new CustomEvent('formsubmitted', { detail: result }));
            
            // Set a timer to clear the message and reset the form after 3 seconds
            setTimeout(() => {
                this.showThankYouMessage = false;
                this.resetForm();
            }, 3000);
        } catch (error) {
            console.error('Error in submit process:', error);
            this.dispatchEvent(new CustomEvent('formerror', { detail: error }));
        }
    }

    resetForm() {
        console.log('resetForm');
        this.formData = {
            meetingDate: null,
            meetingLocation: '',
            clientName: '',
            contactName: '',
            isNewClient: false,
            minGoal: '',
            maxGoal: '',
            valueAddedCallPurpose: '',
            additionalNotes: ''
        };

        this.template.querySelectorAll('lightning-input, lightning-textarea, lightning-combobox').forEach(element => {
            if (element.type === 'checkbox') {
                element.checked = false;
            } else {
                element.value = '';
            }
        });
      
    }

    @api
    clearForm() {
        this.resetForm();
    }
}