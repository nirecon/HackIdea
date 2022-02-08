import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { User } from '../Models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private isLoggedIn = new BehaviorSubject(false);
  private userInfo: User | undefined;

  isLoggedIn$ = this.isLoggedIn.asObservable();
  // userInfo$ = this.userInfo.asObservable();

  changeIsLoggedIn(data: boolean) {
    this.isLoggedIn.next(data);
  }

  changeUserInfo(data: User) {
    this.userInfo = data;
  }
  getUserInfo(): any {
    return this.userInfo;
  }
  constructor() {}
}
