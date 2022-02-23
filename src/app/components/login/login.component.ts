import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from 'src/app/services/data-service.service';
import { LoginServices } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title: string = 'HackIdea';
  empId: number | undefined;
  errorText: string = '';
  error: boolean = false;

  constructor(
    private router: Router,
    private loginServices: LoginServices,
    private dataService: DataServices
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.empId !== undefined && this.empId !== null) {
      const result = this.dataService.getUserInfo(this.empId);
      result.then((Response) => {
        if (Response.val()) {
          this.loginServices.changeUserInfo(Response.val());
          this.loginServices.changeIsLoggedIn(true);
          localStorage.setItem('isloggedIn', 'true');
          localStorage.setItem('userInfo', Response.val());
          this.router.navigateByUrl('dashboard');
        } else {
          this.setError("EmpId doesn't exists.");
        }
      });
    } else {
      this.setError('Please enter valid EmpID.');
    }
  }

  setError(value: string) {
    this.errorText = value;
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 5000);
  }
}
