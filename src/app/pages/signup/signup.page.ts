/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import { UserService } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.css']
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  verifyForm: FormGroup;
  user: CognitoUser;
  isLoading: boolean;
  sub: string;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController
  ) { }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      surname: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      username: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });

    this.verifyForm = this.fb.group({
      vcode: [null, [Validators.required]]
    });

  }

  signup() {
    this.signupForm.markAllAsTouched();
    this.name.markAsTouched();
    this.name.markAsDirty();
    this.surname.markAsDirty();
    this.surname.markAsTouched();
    this.email.markAsDirty();
    this.email.markAsTouched();
    this.username.markAsDirty();
    this.username.markAsTouched();
    this.password.markAsDirty();
    this.password.markAsTouched();
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.auth.signup(this.signupForm.value).then(async response => {
        this.user = response.user;
        this.sub = response.userSub;
        const toast = await this.toastController.create({
          message: 'Verification code has been sent to your email',
          duration: 4000,
          color: 'success'
        });
        toast.present();
        this.isLoading = false;
      }).catch(async error => {
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
        this.isLoading = false;
      });
    }
  }

  async verifyAccount() {
    console.log(this.verifyForm.value.vcode);
    this.isLoading = true;
    await Auth.confirmSignUp(this.user.getUsername(), this.verifyForm.value.vcode).catch(error => {
      console.log(error);
      this.isLoading = false;
    });
    const user = {
      id: this.sub,
      name: this.signupForm.value.name,
      surname: this.signupForm.value.surname,
      email: this.signupForm.value.email,
    };
    this.userService.createUser(user).subscribe({
      next: ((response) => {
        this.isLoading = false;
        this.router.navigate(['home/signin']);
      }),
      error: (async (error) => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
        console.log(error);
      })
    });
  }


  get name() { return this.signupForm.get('name'); }

  get surname() { return this.signupForm.get('surname'); }

  get email() { return this.signupForm.get('email'); }

  get username() { return this.signupForm.get('username'); }

  get password() { return this.signupForm.get('password'); }


}
