
import { LightningElement } from 'lwc';
import { getLoginInfo, logOutAction } from '../../../utilities/apiService/loginInfo';
export default class PageHeader extends LightningElement {
    vloginInfo;
    _userDrpDwn=[
         {label:'User not Logged In', value: 'userName'},
         {label:'Log Out', value: 'logOut'}
    ];
    async connectedCallback() {
        try {
           this.vloginInfo=getLoginInfo();
           console.log(`Page Header connectedCallback() vloginInfo: ${JSON.stringify(this.vloginInfo)}`);
        } catch(error) {
          alert(`Page Header connectedCallback Error: ${error.message}`);
        }
      }
      handleUserLoginChange(event) {
        try {
            console.log('Page Header handleUserLoginhange:', event.detail.value);
            const optionValue=event.detail.value;
            if(optionValue=='logOut') {
                logOutAction();
                window.location.href='/#/login';
            }
       } catch(error) {
           alert(`Page Header handleUserLoginChange Error: ${error.message}`);
       }
      }
    returnHome(event) {
        window.location='/#/'
    }
    get userDrpDwn() {
        try {
            this._userDrpDwn[0].label=this.vloginInfo.name;
            return this._userDrpDwn
       } catch(error) {
           alert(`Page Header userDrpDwn error ${error.message}`);
       }
    }
}