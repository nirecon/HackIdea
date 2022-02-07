import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: string = 'HackIdea';

  constructor(private router: Router, private loginServices: LoginServices) {}

  ngOnInit(): void {}

  login() {
    this.loginServices.changeIsLoggedIn(true);
    console.log('this function was called');
    this.router.navigateByUrl('dashboard');
  }
}
