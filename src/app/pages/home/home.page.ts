import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Auth } from 'aws-amplify';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {
  user: User;
  isLoading: boolean;
  constructor(
    public userService: UserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.user;

  }

  ngDoCheck() {
    this.user = this.userService.user;

  }

  logout() {
    this.isLoading = true;
    Auth.signOut().then(res => {
      this.auth.user = undefined;
      this.userService.user = undefined;
      this.isLoading = false;
      this.router.navigate(['home/map']);
    });
  }
}
