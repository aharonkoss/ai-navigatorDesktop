import { LightningElement, track } from 'lwc';
export default class extends LightningElement {
   logoUrl = './src/images/bank_logo.png'; // URL for the company logo
   @track aryFunctionList=[
          {id: 1, name: 'Get RelPro Info', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#anchor'},
          {id: 2, name: 'Discovery Call', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#call'},
          {id: 3, name: 'Coaching Plans', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#orchestrator'},
          {id: 4, name: 'SMH Training Materials', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#knowledge_base'},
          {id: 5, name: 'AI Navigator', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#topic'},
          {id: 6, name: 'Call Plan', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#setup_assistant_guide'},
          {id: 7, name: 'Key Account Plans', imgUrl: './src/icons/utility-sprite/svg/symbols.svg#key_dates'},
   ];

}