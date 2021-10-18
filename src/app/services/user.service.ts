import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

import { Observable , of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User | null | undefined>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
      // Get the auth state, then fetch the Firestore user document or return null
      this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
            // Logged in
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            // Logged out
            return of(null);
          }
        })
      );
  }

  /** Authenticates the user with Google */
  async googleSignin() {
    console.log("here");  
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
    
  }

  /** Signs the user out of Google */
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  /**
   * Saves the user data to firebase
   * @param user The user we are updating
   */
  private updateUserData(user: any) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    return userRef.set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }, { merge: true });

  }

}
