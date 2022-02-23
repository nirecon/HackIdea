import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServices } from '../services/login-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginServices) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var activate: boolean = false;
    var isLoggedIn = localStorage.getItem('isloggedIn');
    if (isLoggedIn) {
      activate = true;
    } else {
      this.loginService.isLoggedIn$.subscribe((x) => {
        if (x) {
          activate = x;
        } else {
          this.router.navigateByUrl('');
        }
      });
    }

    return activate;
  }
}
