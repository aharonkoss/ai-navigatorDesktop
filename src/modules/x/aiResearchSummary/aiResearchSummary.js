import { LightningElement, api, track } from 'lwc';
import { fetchPostAzure, fetchGetAzure } from '../../../utilities/apiService/apiService';
//import getAIResearchSummary from '@salesforce/apex/OpenAIService.getAIResearchSummary';
//import getSavedSummary from '@salesforce/apex/OpenAIService.getSavedSummary';
export default class AIResearchSummary extends LightningElement {
    @track summary = '';
    @track error = '';
    @track _isLoading = false;
    @api meetingid;
    getSavedSummary='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/getSavedSummary?meetingId={meetingId}';
    getAIResearchSummary='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/getAIResearchSummary?meetingId={meetingId}';
    async connectedCallback(){
        //this._isLoading = true;
       // alert(`connectedCallback this._isLoading = true;`)
        try{
            console.log(`meetingid in research summary =>  ${this.meetingid}`);
            const rawSummary=await fetchGetAzure({url : this.getAIResearchSummary.replace('{meetingId}', this.meetingid)});
            if(rawSummary.success==true) {
                this.summary = this.formatSummary(rawSummary.data);
            } else {
               console.log(`aiResearchSummary connectedCallback rawSummary success is false message: ${rawSummary.message}`);
            }
            
        }
        finally {
          //  alert(`connectedCallback this._isLoading = false;`)
           // this._isLoading = false;
        }
    }

    @api
    async initialize() {
        this._isLoading = true;
        alert(`initialize this._isLoading = true;`)
        this.error = '';
        this.summary = '';
        try {
            if(this.meetingid && this.meetingid.length > 0){
                const rawSummary = await fetchGetAzure({url : this.getSavedSummary.replace('{meetingId}', this.meetingid)});
                if(rawSummary.success==true) {
                    this.summary = this.formatSummary(rawSummary.data);
                    console.log('Formatted summary:', this.summary);
                } else {
                    console.log(`aiResearchSummary initialize rawSummary success is false message: ${rawSummary.message}`);
                }
            } else{
                this.error = 'Please enter Salesperson Input!';
            }
            
        } catch (error) {
            console.error('Error fetching AI research summary:', error);
            this.error = error.body?.message || 'An unexpected error occurred while fetching the AI research summary.';
        } finally {
            this._isLoading = false;
            alert(`initialize this._isLoading = false;`)
        }
    }

    formatSummary(text) {
        // Replace newlines with <br> tags
        let formatted = text.replace(/\n/g, '<br>');
        // Replace **bold text** with <strong> tags
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        return formatted;
    }

    @api
    refresh() {
        this.initialize();
    }

    handleRetry() {
        this.initialize();
    }

    get hasSummary() {
        return this.summary !== '' && this.summary != null;
    }

    get hasError() {
        return this.error !== '';
    }

    renderedCallback() {
        if (this.summary) {
            console.log('Component re-rendered with summary:', this.summary);
        }
    }
    get isLoading() {
        return this._isLoading;
    }
}