import { LightningElement } from 'lwc';

export default class LoginPage extends LightningElement {
  handleLogin(event) {
    event.preventDefault();
    const username = this.template.querySelector('#username').value;
    const password = this.template.querySelector('#password').value;

    console.log('Username:', username);
    console.log('Password:', password);

    // Add authentication logic here
  }
}