import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { AppUser } from '../models/app-users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $loginUser: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: ActivatedRoute,
    private userService: UserService,
    private route: Router
  ) {
    this.$loginUser = this.afAuth.authState;
   }

  login() {
    let returnUrl = this.router.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['']);
  }

  get appUser$ (): Observable<AppUser> {
    return this.$loginUser.pipe(
      switchMap(user=> user ? this.userService.get(user.uid).valueChanges() : Observable.of<AppUser>(null))
    );
  }
}
