import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServices {
  private isLoggedIn = new BehaviorSubject(false);

  isLoggedIn$ = this.isLoggedIn.asObservable();

  changeIsLoggedIn(data: boolean) {
    this.isLoggedIn.next(data);
  }
  constructor() {}
}
