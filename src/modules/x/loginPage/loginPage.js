import { LightningElement, track } from 'lwc';

export default class LoginPage extends LightningElement {
  @track _inProgress=false;
  handleLogin(event) {
    event.preventDefault();
    const username = this.template.querySelector('#username').value;
    const password = this.template.querySelector('#password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Add authentication logic here
  }
  get inProgress() {
     return this._inProgress;
  }
}