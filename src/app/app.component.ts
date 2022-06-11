import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public loadingController: LoadingController,
    private auth: AuthService,
    private userService: UserService,
    private toastController: ToastController,
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'circular'
    });
    await loading.present();
    const user = await Auth.currentAuthenticatedUser().catch(error => {
      loading.dismiss();
    });
    console.log(user);
    if (user) {
      this.auth.user = user;
      this.userService.getUser(user.attributes.sub).subscribe({
        next: ((response) => {
          this.userService.user = response.data.user;
          loading.dismiss();
        }),
        error: (async (error) => {
          const toast = await this.toastController.create({
            message: error.message,
            duration: 4000,
            color: 'danger'
          });
          toast.present();
          loading.dismiss();
        })
      });
    } else {
      loading.dismiss();
    }
  }
}
