import { Injectable } from '@angular/core';
import { get, getDatabase, ref } from 'firebase/database';

@Injectable({
  providedIn: 'root',
})
export class RelationService {
  constructor() {}

  getIdeas(value: number): any {
    const db = getDatabase();
    return get(ref(db, 'relation/' + value + '/idea/'));
  }
}
