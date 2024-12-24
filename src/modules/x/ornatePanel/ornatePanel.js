import { LightningElement, track } from 'lwc';
export default class OrnatePanel extends LightningElement {
    @track isLeftPanelOpen=true;
    @track isChecked=false;
    @track draftContent = '<p>Initial rich text content...</p>';
    @track isSalespersonInputsActive=true;
    @track showHotTopics=true;
    @track isAIResearchSummaryActive=true;
    @track isChatPanelOpen=true;
    @track categories = [   
        { id: 'callplan', name: "Call Plan", completed: false, checkbox:false, checked : false },     
        { id: 'salesperson-inputs', name: "Salesperson Inputs", completed: false, checkbox:false, checked : false },
        { id: 'ai-research-summary', name: "AI Research Summary", completed: false, checkbox:false, checked : false },       
        { id: 'build-trust', name: "Build Trust & Credibility", completed: false, checkbox: true, checked : false },
        { id: 'frame-discussion', name: "Frame the Discussion", completed: false, checkbox: true, checked : false },
        { id: 'explore-needs', name: "Explore Needs", completed: false, checkbox: true, checked : false },
/*         { id: 'goals', name: "Goals", completed: false, checkbox: true, checked : false },
        { id: 'obstacles', name: "Obstacles", completed: false, checkbox: true, checked : false },
        { id: 'affect', name: "Affect", completed: false, checkbox: true, checked : false },
        { id: 'logistics', name: "Logistics", completed: false, checkbox: true, checked : false }, */
        { id: 'stories', name: "Stories", completed: false, checkbox: true, checked : false },
        { id: 'joint-commitment', name: "Joint Commitment", completed: false, checkbox: true, checked : false }
    ];
    @track conversationOptions=[
            {label: 'Default', value: 'default'},
            {label: 'Data Driven', value: 'datadriven'}
    ];
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
    handleConversationStyleChange(event) {
        console.log('Selected Conversation Style:', event.detail.value);
    }
    get showHotTopics() {
     //   return this.activeCategoryId && this.activeCategoryId !== 'salesperson-inputs' && this.activeCategoryId !== 'ai-research-summary';
          return false;
    }
    get isSalespersonInputsActive() {
        //return this.activeCategoryId === 'salesperson-inputs';
        return false;
    }
    get leftPanelClass() {
        return `left-panel ${this.isLeftPanelOpen ? 'open' : ''} ${this.isWidePanel ? 'wide' : ''}`;
    }
    get categoriesWithClasses() {
        return this.categories.map(category => ({
            ...category,
            itemClass:`category-item ${category.id == this.activeCategoryId ? ' background-antiquewhite' : ''}`,
            iconClass: `category-icon ${category.completed ? 'completed' : ''}`
        }));
    }
    
}