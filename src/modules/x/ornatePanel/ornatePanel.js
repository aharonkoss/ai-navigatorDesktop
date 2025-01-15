import { LightningElement, track, api } from 'lwc';
import { getLoginInfo } from '../../../utilities/apiService/loginInfo';

export default class OrnatePanel extends LightningElement {
    @track isLeftPanelOpen=true;
    @track isChecked=false;
    @track draftContent = '<p>Initial rich text content...</p>';
    @track showSalespersonInputs=false;
    @track showAIResearchSummary=false;
    @track isWidePanel=false;
    @track _showHotTopics=true;
    @track isAIResearchSummaryActive=true;
    @track isChatPanelOpen=true;
    @track categories = [    
        { id: 'salesperson-inputs', name: "Salesperson Inputs", completed: false, checkbox:false, checked : false },
        { id: 'ai-research-summary', name: "AI Research Summary", completed: false, checkbox:false, checked : false },   
        { id: 'scenarios', name: "Scenarios", completed: false, checkbox:false, checked : false },       
        { id: 'build-trust', name: "Build Trust & Credibility", completed: false, checkbox: true, checked : false },
        { id: 'frame-discussion', name: "Frame the Discussion", completed: false, checkbox: true, checked : false },
        { id: 'explore-needs', name: "Explore Needs", completed: false, checkbox: true, checked : false },
        { id: 'stories', name: "Stories", completed: false, checkbox: true, checked : false },
        { id: 'joint-commitment', name: "Joint Commitment", completed: false, checkbox: true, checked : false },
        { id: 'propensity-score', name: "Propensity Score", completed: false, checkbox: true, checked : false }
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
    @track activeCategoryId='';
    @track selectedValue='salesPersonRole';
    @track clientConnectionCss='accordion-content';
    @track categoriesCss='category-list';
    @track hotTopicsCss='accordion-content';
    @track generateDraftCss='accordion-content';
    @track discoveryCallPlanCss='accordion-content';
    @api salespersonInputs; // Reference to child component
    meetingPreparationId;
    getAPILatestMeetingPreparation='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/getAPILatestMeetingPreparation?meetingId=a00ak00000cEP2HAAW';
    apiInitializeConversation='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/apiInitializeConversation';
    apiGenerateAndSaveDraft='https://assistantcom3-dev-ed.develop.my.salesforce.com/services/apexrest/apiGenerateAndSaveDraft';
    
    async connectedCallback() {
        try {
           const vloginInfo=getLoginInfo();
           console.log(`connectedCallback() vloginInfo: ${JSON.stringify(vloginInfo)}`);
           if(vloginInfo.authenticated===false) {
              window.location.href = '/#/login';
           } else {
            this.meetingPreparationId = '';
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
    handleSalespersonFormSubmitted(event) {
        this.meetingPreparationId = event.detail;
        console.log(this.meetingPreparationId);
        const categoryIndex = this.categories.findIndex(category => category.id === 'salesperson-inputs');
        if (categoryIndex !== -1) {
            this.categories[categoryIndex].completed = true;
        }
    }
    handleSalespersonFormError(event) {
        console.error('Error submitting salesperson form:', event.detail);
    }
    handleCategoryClick(event) {
      try {
        console.log(`ornatePanel Category Clicked. Data Id: ${event.currentTarget.dataset.id}`);
        const categoryId = event.currentTarget.dataset.id;
        /*
        if (this.activeCategoryId === categoryId && this.isLeftPanelOpen) {
            this.closeLeftPanel();
        } else {
            this.openLeftPanel(categoryId);
        }
       */
        if(this.activeCategoryId != categoryId){
            this.activeCategoryId = categoryId;
            if (categoryId === 'salesperson-inputs') {
                this.openSalespersonInputs();
            } else if (categoryId === 'ai-research-summary') {
                //this.openAIResearchSummary();
                console.log(`handleCategoryClick categoryId === ai-research-summary`);
            } else {
                this.threadId = null;
                this.messages = [];
                this.isInitializing = true;
                this.isLoading = true;
                this.initializeCategoryKnowledge(categoryId);
            }
        }
    } catch(error) {
        alert(`handleCategoryClick error ${error.message}`);
    }
    }
    openAIResearchSummary() {
        const aiResearchSummary = this.template.querySelector('c-ai-research-summary');
        if (aiResearchSummary) {
            aiResearchSummary.initialize();
        }
    }
    closeLeftPanel() {
        this.isChatPanelOpen = true;
        this.isLeftPanelOpen = false;
        //this.activeCategoryId = null;
        this._showHotTopics = false;
        this.showSalespersonInputs = false;
        this.showAIResearchSummary = false;
        this.isWidePanel = false;
    }
    openLeftPanel(categoryId) {
        //this.activeCategoryId = categoryId;
        this.isLeftPanelOpen = true;
        this.isWidePanel = categoryId === 'salesperson-inputs' || categoryId === 'ai-research-summary';

        // Reset all sections
        this._showHotTopics = false;
        this.showSalespersonInputs = false;
        this.showAIResearchSummary = false;
    
        // Show the appropriate section based on the category clicked
        switch(categoryId) {
            case 'salesperson-inputs':
                this.showSalespersonInputs = true;
                this.isChatPanelOpen = false;
                break;
            case 'ai-research-summary':
                this.showAIResearchSummary = true;
                this.isChatPanelOpen = false;
                break;
            default:
                this._showHotTopics = true;
                this.isChatPanelOpen = true;
        }
    }
    openSalespersonInputs() {
        try {
            this.activeCategoryId='salesperson-inputs'; // Dynamically render the child component
            // Wait for the DOM to update, then initialize the child component
            setTimeout(() => {
                this.handleOpenSalespersonInputs();
            }, 0); // Allow the DOM rendering to complete
        } catch(error) {
            alert(`openSalespersonInputs error ${error.message}`);
        }
    }
    handleOpenSalespersonInputs() {
        try {
            alert(`handleOpenSalespersonInputs activeCategoryId ${this.activeCategoryId}`);
            const salespersonInputs = this.template.querySelector('[data-id="salespersonInputs"]');
            if (salespersonInputs) { // Reference to child component) {
                salespersonInputs.initialize();
            } else {
                alert.error('handleOpenSalespersonInputs not found');
            }  
        } catch(error) {
            alert(`handleOpenSalespersonInputs error ${error.message}`);
        }
    }
    async initializeCategoryKnowledge(categoryId) {
        //await this.getMessages(categoryId);
        console.log(`initializeCategoryKnowledge todo await this.getMessages(categoryId);`);
    }
    get showHotTopics() {
     //   return this.activeCategoryId && this.activeCategoryId !== 'salesperson-inputs' && this.activeCategoryId !== 'ai-research-summary';
          return this._showHotTopics;
    }
    get isSalespersonInputsActive() {
        return this.activeCategoryId === 'salesperson-inputs';
    }
    get isChatPanelActive() {
        return this.activeCategoryId !== 'salesperson-inputs';
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
    get isPrintCallPlanDisable(){
        let selectedCategories = this.getSelectedCategories;
        return selectedCategories.length > 0 && this.meetingPreparationId ? false : true;
    }
    get getSelectedCategories(){
        let selectedCategories = '';
        this.categories.forEach(category => {
            if(category.checked){
                selectedCategories += category.name + ',';
            }
        });
        return selectedCategories;
    }
    
}