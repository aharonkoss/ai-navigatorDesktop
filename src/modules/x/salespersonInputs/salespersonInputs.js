import { LightningElement, api, track } from 'lwc';
import { fetchPost, fetchGet } from '../../../utilities/apiService/apiService';

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
    getEndPoint='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/getAPILatestMeetingPreparation?meetingId={meetingId}'; //a00ak00000cSTfVAAW
    postEndPoint='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/apiCreateMeetingPreparation';

    async connectedCallback(){
        var result={};
        this._inProgress=true;
        try {
        console.log('Sales Person Input connectedCallback: this.meetingid - ', this.meetingid);
        if(this.meetingid && this.meetingid.length > 0){
            const params=`&meetingId=${this.meetingid}`;
            const strResult=await fetchGet('getMeetingPreparation',params,'');
            result=JSON.parse(strResult);
            if(result.success==true) {
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
        if(this.meetingid && this.meetingid.length > 0){
            console.log(`sales person input meeting is ${this.meetingid}`);
        } else {
            this.resetForm();
        }
    }

    handleInputChange(event) {
        const field = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        this.formData[field] = value;
    }

    async handleSubmit(event) {
        this._inProgress=true;
        event.preventDefault();
        console.log('Sales Person Input...Submitting form data:', JSON.stringify(this.formData));
    
        try {

            const result = await fetchPost('createMeetingPreparation',this.formData, 'js585-TXcjmVS3qfkgkWcP7A0dMLhnqqUBSG_3i_11MNAzFu6cPEmA==');  
            if(result.success==true) {
                alert(`Sales Person Input success = true\n${JSON.stringify(result)}`);
                this.formData['meetingId'] = result.meetingPreparationId;
                console.log('Meeting Preparation record created with Id:', result.meetingPreparationId);
                this.showThankYouMessage = true;
                console.log('Thank you message should be shown now');
                this.dispatchEvent(new CustomEvent('formsubmitted', { detail: result.meetingPreparationId }));
            } else {
                alert(`Sales Person Input success = false\n${JSON.stringify(result)}`);
            }
            
            /* Set a timer to clear the message and reset the form after 3 seconds
            setTimeout(() => {
                this.showThankYouMessage = false;
                this.resetForm();
            }, 3000);*/
        } catch (error) {
            console.log(`Sales Person Input handleSubmit: Error in submit process: ${error.message}`);
            this.dispatchEvent(new CustomEvent('formerror', { detail: error }));
        }
        this._inProgress=false;
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