import { LightningElement, track } from 'lwc';
import { fetchPost } from '../../../utilities/apiService/apiService';

export default class LoginPage extends LightningElement {
  @track _inProgress=false;
  @track _userName;
  @track _password;
  @track _loginMessage;
  handleUserNameChange(event) {
    this._userName=event.target.value;
    console.log('Username:', this._userName);
  }
  handlePasswordChange(event) {
    this._password=event.target.value;
    console.log('Password:', this._password);
  }
  async handleLogin(event) {
    if(this._userName!=null&&this._password!=null) {
        const loginReq = {email: this._userName, password: this._password};
        var response={};
        this._inProgress=true;
        try {
            response= await fetchPost('aiNavigatorAuth', loginReq);
            if(response.success) {
              this._loginMessage=`handleLogin response is true. message is: ${response.message}`;
            } else {
              this._loginMessage=`handleLogin response is false. message is: ${response.message}`;
            }
        } catch(error) {
          this._loginMessage=`handle login click error: ${error.message}`;
        }
  } else {
        this._loginMessage=`User Name and Password are blank.`;
  }
    this._inProgress=false;
  }
  get inProgress() {
     return this._inProgress;
  }
  get loginMessage() {
    return this._loginMessage;
  }
}