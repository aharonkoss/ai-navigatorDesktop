import { LightningElement, api, wire } from 'lwc';
import getUserScenarios from '@salesforce/apex/ScenariosController.getUserScenarios';
import getAIGeneratedScenarios from '@salesforce/apex/ScenariosController.getAIGeneratedScenarios';
import saveScenario from '@salesforce/apex/ScenariosController.saveScenario';
import getUserInfo from '@salesforce/apex/OrnatePanelController.getUserInfo';

export default class Scenarios extends LightningElement {

    userName = 'user';
    userScenarios;
    aiGeneratedScenarios;
    @api selectedScenarios = [];
    errorMessage = '';
    isError = false;
    isUserSpinner = false;
    isAISpinner = false;
    isNewScenario = false;
    newScenario = {name : '', description : '', checked : false, disabled : false};
    @api isAllDisable = false;

    connectedCallback(){
        if(!this.isAllDisable){
            this.fetchUserScenarios();
            this.fetchAIGeneratedScenarios();
        }
    }

    get isLimit(){
        return this.selectedScenarios && this.selectedScenarios.length >= 3 ? true : false;
    }
    get isScenarioSelected(){
        return this.selectedScenarios && this.selectedScenarios.length > 0 ? true : false;
    }
    get isSaveScenarioDesable(){
        return this.newScenario && this.newScenario.name && this.newScenario.name.length > 3 && this.newScenario.description && this.newScenario.description.length > 10 ? false : true;
    }

    @wire(getUserInfo) 
    getUserInfo({data, error}) {
        if(data) {
            this.userName = data.Name;
        }
        if(error){
            console.error(error);
        }
    }

    fetchUserScenarios(){
        this.isUserSpinner = true;
        getUserScenarios().then(data => {
            console.log(data);
            if(data && data.length > 0){
                this.userScenarios = data;
                this.manageDisable();
            }
            else{
                this.userScenarios = null;
            }
            this.isUserSpinner = false;
        }).catch(error => {
            this.userScenarios = null;
            this.isUserSpinner = false;
        })
    }

    fetchAIGeneratedScenarios(){
        this.isAISpinner = true;
        this.isError = false;
        getAIGeneratedScenarios().then(data => {
            console.log(data);
            if(data && data.length > 0){
                this.aiGeneratedScenarios = data;
                this.manageDisable();
            }
            else{
                this.aiGeneratedScenarios = null;
            }
            this.isAISpinner = false;
        }).catch(error => {
            this.isError = true;
            this.errorMessage = error.body.message;
            this.aiGeneratedScenarios = null;
            this.isAISpinner = false;
        })
    }
    handleCheckboxChange(event) {
        console.log(`scenarios handleCheckboxChange event.detail.value ${event.detail.value}`);
    }
    handleCheckbox(event){
        let type = event.target.dataset.type;
        let name = event.target.dataset.name;
        let description = event.target.dataset.description;
        let isChecked = event.target.checked;

        let temp = JSON.parse(JSON.stringify(this.selectedScenarios));
        if(isChecked){
            temp.push({'name' : name, 'description' : description});
        }else{
            let temp2 = [];
            for(let scenario of temp){
                if(scenario.description != description){
                    temp2.push(scenario);
                }
            }
            temp = [...temp2];
        }
        this.selectedScenarios = [...temp];
        this.dispatchEvent(new CustomEvent('selectedscenarios', {detail : temp}));

        if(type == "User's Scenario"){
            this.userScenarios.forEach(scenario => {
                if(scenario.name == name){
                    scenario.checked = isChecked;
                }
            });
        }
        else if(type == "AI Generated Scenarios"){
            this.aiGeneratedScenarios.forEach(scenario => {
                if(scenario.name == name){
                    scenario.checked = isChecked;
                }
            });
        }

        this.manageDisable();
    }
    handleButton(event){

        let button = event.target.dataset.button;
        console.log(button);
        if(button == 'Refresh Scenarios'){
            if(this.aiGeneratedScenarios){
                let descriptions = [];
                let temp = JSON.parse(JSON.stringify(this.selectedScenarios));
                this.aiGeneratedScenarios.forEach(scenario => {
                    if(scenario.checked){
                        descriptions.push(scenario.description);
                    }
                });
                let temp2 = [];
                for(let scenario of temp){
                    if(!descriptions.includes(scenario.description)){
                        temp2.push(scenario);
                    }
                }
                temp = [...temp2];
                this.selectedScenarios = [...temp];
                this.dispatchEvent(new CustomEvent('selectedscenarios', {detail : temp}));
            }
            this.fetchAIGeneratedScenarios();
        }else if(button == 'Add Scenario'){
            this.isNewScenario = true;
        }
    }

    closeModal(){
        this.isNewScenario = false;
        this.newScenario = {name : '', description : '', checked : false, disabled : false};
    }

    handleValueChange(event){
        let key = event.target.dataset.key;
        let value = event.target.value;
        let temp = {...this.newScenario};
        this.newScenario = {};
        temp[key] = value;
        this.newScenario = {...temp};
    }

    async saveNewScenario(){
        this.isNewScenario = false;
        await saveScenario({ scenario : this.newScenario });

        let temp = JSON.parse(JSON.stringify(this.userScenarios));
        temp.push(this.newScenario);
        this.userScenarios = [...temp];
        this.manageDisable();
    }

    manageDisable(){
        if(this.userScenarios){
            this.userScenarios.forEach(scenario => {
                scenario.disabled = this.isAllDisable || (this.isLimit && !scenario.checked);
            });
            let tempVar = [...this.userScenarios];
            this.userScenarios = [];
            this.userScenarios = [...tempVar];
        }
        if(this.aiGeneratedScenarios){
            this.aiGeneratedScenarios.forEach(scenario => {
                scenario.disabled = this.isAllDisable || (this.isLimit && !scenario.checked);
            });
            let tempVar = [...this.aiGeneratedScenarios];
            this.aiGeneratedScenarios = [];
            this.aiGeneratedScenarios = [...tempVar];
        }
    }
}