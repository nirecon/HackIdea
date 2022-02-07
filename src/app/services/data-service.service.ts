import { Injectable } from '@angular/core';
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  set,
  get,
} from 'firebase/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataServices {
  db = getDatabase();
  ideasList = new Subject<any>();
  idesList$ = this.ideasList.asObservable();
  constructor() {}

  getIdeas() {
    onValue(ref(this.db, '/ideas/'), (snapshot) => {
      const ideas = snapshot.val().map((x: any) => x);
      this.ideasList.next(ideas);
    });
  }

  addIdeas(uid: any) {
    const postRef = ref(this.db, '/ideas/');

    runTransaction(postRef, (post) => {
      if (post) {
        if (post.ideaid && post.ideaid[uid]) {
          post.starCount--;
          post.stars[uid] = null;
        } else {
          post.starCount++;
          if (!post.stars) {
            post.stars = {};
          }
          post.stars[uid] = true;
        }
      }
      return post;
    });
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
          alert('User created');
        });
      } else {
        alert('the userId exists');
      }
    });
  }
}
