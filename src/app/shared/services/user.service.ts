import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-users.model';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({name: user.displayName, email: user.email});
  }

  get (uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }

  isAdmin (user: firebase.User) {
    this.db.object('/users/' + user.uid)
  }
}
