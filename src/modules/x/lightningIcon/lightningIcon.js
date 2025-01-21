import { LightningElement, api} from 'lwc';
export default class LightningIcon extends LightningElement {
   @api iconurl;
   @api cssclass;

   get getCssClass() {
      try {
         if(this.cssclass==null) {
            return 'custom-icon';
         } else {
            return this.cssclass;
         }
     } catch(error) {
        alert(`LightningIcon getCssClass error ${error.message}`);
        return 'custom-icon';
     }
   }
}