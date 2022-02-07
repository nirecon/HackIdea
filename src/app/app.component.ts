import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from './services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private loginServices: LoginServices) {
    this.loginServices.isLoggedIn$.subscribe((x) => {
      this.isLoggedIn = x;
    });
  }

  redirect() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.loginServices.changeIsLoggedIn(false);
    this.router.navigateByUrl('logout');
  }

  signup() {
    this.router.navigateByUrl('signup');
  }

  takeHome() {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('dashboard');
    } else {
      this.router.navigateByUrl('');
    }
  }
}
