import { LightningElement, track } from 'lwc';
export default class OrnatePanel extends LightningElement {
    @track isLeftPanelOpen=true;
    @track isChecked=false;
    @track draftContent = '<p>Initial rich text content...</p>';
    @track isSalespersonInputsActive=true;
    @track showHotTopics=true;
    @track isAIResearchSummaryActive=true;
    @track isChatPanelOpen=true;

    handleHotTopicsClick(event) {
        console.log('Hot Topics Click Function!');
        // Add your logic here
    }
    handleGenerateDraft(event) {
        console.log('Hot Topics Click Function!');
        // Add your logic here
    }
    handleCheckboxChange(event) {
        this.isChecked = event.detail.value; // Updates the checkbox state
    }
    handleNewMeeting() {
        console.log('New Meeting button clicked!');
        // Add your logic here
    }
    handlePrintCallPlan() {
         console.log('Print Call Plan button clicked!');
        // Add your logic here
    }
    handleDraftChange(event) {
        this.draftContent = event.detail.value;
    }
    get showHotTopics() {
     //   return this.activeCategoryId && this.activeCategoryId !== 'salesperson-inputs' && this.activeCategoryId !== 'ai-research-summary';
          return false;
    }
    get isSalespersonInputsActive() {
        //return this.activeCategoryId === 'salesperson-inputs';
        return false;
    }
    
}