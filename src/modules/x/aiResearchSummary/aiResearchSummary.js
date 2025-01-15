import { LightningElement, api, track } from 'lwc';
import { fetchPostAzure, fetchGetAzure } from '../../../utilities/apiService/apiService';
//import getAIResearchSummary from '@salesforce/apex/OpenAIService.getAIResearchSummary';
//import getSavedSummary from '@salesforce/apex/OpenAIService.getSavedSummary';

export default class AIResearchSummary extends LightningElement {
    @track summary = '';
    @track error = '';
    @track isLoading = false;
    @api meetingid;

    async connectedCallback(){
        this.isLoading = true;
        try{
            console.log(`meetingid in research summary =>  ${this.meetingid}`);
            const rawSummary = await getSavedSummary({meetingId : this.meetingid});
            this.summary = this.formatSummary(rawSummary);
        }
        finally {
            this.isLoading = false;
        }
    }

    @api
    async initialize() {
        this.isLoading = true;
        this.error = '';
        this.summary = '';

        try {
            if(this.meetingid && this.meetingid.length > 0){
                const rawSummary = await getAIResearchSummary({meetingId : this.meetingid});
                this.summary = this.formatSummary(rawSummary);
                console.log('Formatted summary:', this.summary);
            }
            else{
                this.error = 'Please enter Salesperson Input!';
            }
            
        } catch (error) {
            console.error('Error fetching AI research summary:', error);
            this.error = error.body?.message || 'An unexpected error occurred while fetching the AI research summary.';
        } finally {
            this.isLoading = false;
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
}