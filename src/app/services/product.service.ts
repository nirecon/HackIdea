import { Injectable } from '@angular/core';
import {
  get,
  getDatabase,
  limitToLast,
  onValue,
  query,
  ref,
  runTransaction,
  set,
} from 'firebase/database';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  db = getDatabase();
  constructor() {}

  getIdeas(): any {
    return get(ref(this.db, '/ideas/'));
  }

  preFetchLastId() {
    const db = getDatabase();
    return get(query(ref(db, 'ideas/'), limitToLast(1)));
  }

  addItem(value: any, result: any, empId: number) {
    const db = getDatabase();
    return set(
      ref(db, 'ideas/' + ((parseInt(result) ? parseInt(result) : 0) + 1)),
      {
        createdAt: this.getDate(),
        createdBy: empId,
        description: value.description,
        title: value.title,
        upVotes: 0,
        ideaId: (parseInt(result) ? parseInt(result) : 0) + 1,
      }
    );
  }

  updateUpVotes(value: number, ideaId: any, empId: number) {
    const db = getDatabase();
    const postRef = ref(db, 'ideas/' + ideaId);

    runTransaction(postRef, (post) => {
      if (post) {
        post.upVotes = post.upVotes + value;
      }
      return post;
    }).then((Response) => {
      this.updateRelation(value, ideaId, empId);
    });
  }

  updateRelation(value: number, ideaId: any, empId: number) {
    const db = getDatabase();
    const updateRef = ref(db, 'relation/' + empId);

    get(updateRef).then((Response) => {
      if (!Response.val()) {
        set(updateRef, {
          idea: {
            0: ideaId,
          },
        });
      } else {
        runTransaction(updateRef, (post) => {
          if (post) {
            if (value == 1) {
              post.idea.push(ideaId);
            } else {
              post.idea.pop(ideaId);
            }
          }
          return post;
        });
      }
    });
  }

  getDate() {
    var date = new Date();
    return date.toString();
  }
}
