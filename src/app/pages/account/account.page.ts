/* eslint-disable @typescript-eslint/member-ordering */
import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { Auth } from 'aws-amplify';

@Component({
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.css']
})
export class AccountPage implements OnInit {
  userForm: FormGroup;
  user: User;
  isLoading: boolean;
  sub: string;
  constructor(
    public auth: AuthService,
    private apollo: Apollo,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      surname: [null, [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z ]*')]],
      email: [null, [Validators.required]],
    });
  }

  ionViewWillEnter() {
    console.log(this.auth.user);
    this.getUser();
  }

  async getUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
    if (user) {
      this.auth.user = user;
      this.userService.getUser(user.attributes.sub).subscribe(response => {
        this.user = response.data.user;
        this.userForm.get('name').setValue(this.user.name);
        this.userForm.get('surname').setValue(this.user.surname);
        this.userForm.get('email').setValue(this.user.email);
      }, async error => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      });
    }
  }

  ionViewWillLeave() {
    this.userForm.reset();
  }

  updateAccount() {
    this.userForm.markAllAsTouched();
    this.name.markAsTouched();
    this.name.markAsDirty();
    this.surname.markAsDirty();
    this.surname.markAsTouched();
    if (!this.userForm.valid) {
      return;
    }
    this.isLoading = true;
    const user = {
      name: this.userForm.value.name,
      surname: this.userForm.value.surname,
    };
    this.userService.updateUser(this.user.id, user).subscribe({
      next: (async (response) => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: 'Account successfully updated',
          duration: 4000,
          color: 'success'
        });
        toast.present();
        this.userService.userQueryRef?.refetch();
      }),
      error: (async (error) => {
        const toast = await this.toastController.create({
          message: error.message,
          duration: 4000,
          color: 'danger'
        });
        toast.present();
      })
    });
  }

  get name() { return this.userForm.get('name'); }

  get surname() { return this.userForm.get('surname'); }
}
