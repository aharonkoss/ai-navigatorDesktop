import { LightningElement, track } from 'lwc';
import { getLoginInfo } from '../../../utilities/apiService/loginInfo';

export default class OrnatePanel extends LightningElement {
    @track isLeftPanelOpen=true;
    @track isChecked=false;
    @track draftContent = '<p>Initial rich text content...</p>';
    @track _isSalespersonInputsActive=true;
    @track _showHotTopics=true;
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
    @track clientTypeOptions=[
        {label: 'Analytical', value: 'analytical'},
        {label: 'Default', value: 'default'}
];
     @track radioOptions = [
        { label: 'Client Role', value: 'clientRole' },
        { label: 'Salesperson Role', value: 'salesPersonRole' },
        { label: 'Default', value: 'default' },
    ];
    @track activeCategoryId='salesperson-inputs';
    @track selectedValue='salesPersonRole';
    @track clientConnectionCss='accordion-content';
    @track categoriesCss='category-list';
    @track hotTopicsCss='accordion-content';
    @track generateDraftCss='accordion-content';
    @track discoveryCallPlanCss='accordion-content';
    async connectedCallback() {
        try {
           const vloginInfo=getLoginInfo();
           console.log(`connectedCallback() vloginInfo: ${JSON.stringify(vloginInfo)}`);
           if(vloginInfo.authenticated===false) {
              window.location.href = '/#/login';
           } 
        } catch(error) {
          alert(`Landing Page connectedCallback Error: ${error.message}`);
        }
      }
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
    handleClientTypeChange(event) {
        console.log('Selected Client Type:', event.detail.value);
    }
    handleRadioChange(event) {
        this.selectedValue = event.detail.value;
    }
    handleClientConnectionCssClick(event) {
        if(this.clientConnectionCss==='accordion-content') {
            this.clientConnectionCss='accordion-content-expand';
        } else {
            this.clientConnectionCss='accordion-content';
        }
    }
    handleCategoriesCssClick(event) {
        if(this.categoriesCss==='category-list') {
            console.log(`handleCategoriesCssClick this.categoriesWithClasses:${JSON.stringify(this.categoriesWithClasses)}`)
            this.categoriesCss='category-list-expand';
        } else {
            this.categoriesCss='category-list';
        }
    }
    handleHotTopicsCssClick(event) {
        if(this.hotTopicsCss==='accordion-content') {
            this.hotTopicsCss='accordion-content-expand';
        } else {
            this.hotTopicsCss='accordion-content';
        }
    }
    handleGenerateDraftCssClick(event) {
        if(this.generateDraftCss==='accordion-content') {
            this.generateDraftCss='accordion-content-expand';
        } else {
            this.generateDraftCss='accordion-content';
        }
    }
    handleDiscoveryCallPlanCssClick(event) {
        if(this.discoveryCallPlanCss==='accordion-content') {
            this.discoveryCallPlanCss='accordion-content-expand';
        } else {
            this.discoveryCallPlanCss='accordion-content';
        }
    }
    handleCategoryClick(event) {
        console.log(`ornatePanel Category Clicked. Data Id: ${event.detail.value}`);
    }
    get showHotTopics() {
     //   return this.activeCategoryId && this.activeCategoryId !== 'salesperson-inputs' && this.activeCategoryId !== 'ai-research-summary';
          return true;
    }
    get isSalespersonInputsActive() {
        //return this.activeCategoryId === 'salesperson-inputs';
        return true;
    }
    get leftPanelClass() {
        return `left-panel ${this.isLeftPanelOpen ? 'open' : ''} ${this.isWidePanel ? 'wide' : ''}`;
    }
    get categoriesWithClasses() {
        return this.categories
        .map(category => ({
            ...category,
            itemClass:`category-item ${category.id == this.activeCategoryId ? ' background-antiquewhite' : ''}`,
            iconClass: `category-icon ${category.completed ? 'completed' : ''}`
        }));
    }
    
}