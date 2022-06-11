import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: CognitoUser;
  constructor(
  ) { }

  async signup({ username, password, email }) {
    console.log(username);
    return await Auth.signUp({
      username,
      password,
      attributes: {
        email
      }
    });
  }

  async signin(username: string, password: string) {
    return await Auth.signIn(username, password);
  }

  // confirmAccount(username: string, code: string) {
  //   return Auth.confirmSignUp()
  // }

}
