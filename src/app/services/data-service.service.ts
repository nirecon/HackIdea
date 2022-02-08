import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getDatabase, ref, set, get } from 'firebase/database';
import { Subject } from 'rxjs';
import { LoginServices } from './login-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataServices {
  ideasList = new Subject<any>();
  idesList$ = this.ideasList.asObservable();
  constructor(private loginservice: LoginServices, private router: Router) {}

  getUserInfo(value: any) {
    const db = getDatabase();
    return get(ref(db, 'user/' + value));
  }

  writeUserData(value: any) {
    const db = getDatabase();
    get(ref(db, 'user/' + value.empId)).then((Response) => {
      if (!Response?.val()) {
        set(ref(db, 'user/' + value.empId), {
          empId: value.empId,
          userName: value.userName,
          email: value.email,
          contact: value.contact,
        }).then((resp) => {
          this.router.navigateByUrl('login');
        });
      } else {
        alert('UserId already exits');
      }
    });
  }
}
