import { LightningElement, track } from 'lwc';
import { getLoginInfo } from '../../../utilities/apiService/loginInfo';

export default class LandingPage extends LightningElement {
   logoUrl = '/images/bank_logo.png'; // URL for the company logo
   @track aryFunctionList=[
          {id: 1, name: 'Get RelPro Info', imgUrl: '/icons/utility-sprite/svg/symbols.svg#anchor'},
          {id: 2, name: 'Discovery Call', imgUrl: '/icons/utility-sprite/svg/symbols.svg#call'},
          {id: 3, name: 'Coaching Plans', imgUrl: '/icons/utility-sprite/svg/symbols.svg#orchestrator'},
          {id: 4, name: 'SMH Training Materials', imgUrl: '/icons/utility-sprite/svg/symbols.svg#knowledge_base'},
          {id: 5, name: 'AI Navigator', imgUrl: '/icons/utility-sprite/svg/symbols.svg#topic'},
          {id: 6, name: 'Call Plan', imgUrl: '/icons/utility-sprite/svg/symbols.svg#setup_assistant_guide'},
          {id: 7, name: 'Key Account Plans', imgUrl: '/icons/utility-sprite/svg/symbols.svg#key_dates'},
   ];
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
   goToMain(event) {
      window.location='/#/main'
  }

}