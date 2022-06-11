import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.css']
})
export class SigninPage implements OnInit {
  signinForm: FormGroup;
  isLoading: boolean;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.signinForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  signin() {
    this.isLoading = true;
    this.auth.signin(this.signinForm.value.username, this.signinForm.value.password).then(response => {
      console.log(response);
      this.auth.user = response;
      this.userService.getUser(response.attributes.sub).subscribe({
        next: ((data) => {
          console.log(data.data.user);
          this.isLoading = false;
          this.userService.user = data.data.user;
          this.signinForm.reset();
          this.router.navigate(['home/map']);
        }),
        error: (async (error) => {
          this.isLoading = false;
          const toast = await this.toastController.create({
            message: error.message,
            duration: 4000,
            color: 'danger'
          });
          toast.present();
        })
      });
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
