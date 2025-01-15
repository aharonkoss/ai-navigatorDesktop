import { LightningElement, api, track } from 'lwc';
import { fetchPostAzure, fetchGetAzure } from '../../../utilities/apiService/apiService';
//import createMeetingPreparation from '@salesforce/apex/OrnatePanelController.createMeetingPreparation';
//import getMeetingPreparation from '@salesforce/apex/OrnatePanelController.getMeetingPreparation';//new commit

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
    @track _inProgress=false;
    @api meetingid;
    getEndPoint='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/getAPILatestMeetingPreparation?meetingId={meetingId}';

    async connectedCallback(){
        var result={};
        this._inProgress=true;
        try {
        console.log('this.meetingid - ', this.meetingid);
        if(this.meetingid && this.meetingid.length > 0){
            const request={url: getEndPoint.replace('{meetingId}', this.meetingid )};
            result= await fetchGetAzure(request);
            console.log(result);
            if(result.success===true) {
                let frmData = {};
                frmData.meetingId = result.data.Id;
                frmData.meetingDate = result.data[0].Meeting_Date__c,
                frmData.meetingLocation = result.data[0].Meeting_Location__c ? result.data[0].Meeting_Location__c : '',
                frmData.clientName = result.data[0].Client__c ? result.data[0].Client__c : '',
                frmData.contactName = result.data[0].Client_Contact__c ? result.data[0].Client_Contact__c : '',
                frmData.isNewClient = result.data[0].Is_New_Client__c,
                frmData.minGoal = result.data[0].Minimum_Goal__c ? result.data[0].Minimum_Goal__c : '',
                frmData.maxGoal = result.data[0].Maximum_Goal__c ? result.data[0].Maximum_Goal__c : '',
                frmData.valueAddedCallPurpose = result.data[0].Value_Added_Call_Purpose__c ? result.data[0].Value_Added_Call_Purpose__c : '',
                frmData.additionalNotes = result.data[0].Additional_Notes__c ? result.data[0].Additional_Notes__c : ''
                this.formData = {...frmData};
                console.log(JSON.stringify(this.formData));
            } else {
                alert(`sales person input connectedCallback result success is false.`);
            }
        } else {
            console.log(`sales person input connectedCallback meeting id is blank.`);
        }
            
        } catch(error) {
             alert(`sales person input connectedCallback error ${error.message}`);
        }
        this._inProgress=false;
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
    get inProgress() {
        return this._inProgress;
    }
}