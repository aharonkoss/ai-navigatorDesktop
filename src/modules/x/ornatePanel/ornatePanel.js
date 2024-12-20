import { LightningElement, track } from 'lwc';
export default class OrnatePanel extends LightningElement {
    @track isLeftPanelOpen=true;
    
    handleHotTopicsClick(event) {

    }
    handleGenerateDraft(event) {

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