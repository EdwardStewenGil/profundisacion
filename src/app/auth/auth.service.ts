import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;
  url="";

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) { }

  getUserState() {
    return this.afAuth.authState;
  }

  login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        if(userCredential) {
          console.log(userCredential.user.updateProfile);
          console.log(userCredential.user.photoURL);
          console.log(password);
          console.log(email); 
          console.log(email);
          if (userCredential.user.photoURL == "Administrador")
          this.router.navigate(['/administrador']);
       else if (userCredential.user.photoURL == "Evaluador")
       this.router.navigate(['/evaluador']);
       else if (userCredential.user.photoURL == "Trabajador")
       this.router.navigate(['/trabajador']);
        

        }
      })
  }

  createUser(user) {
    console.log(user);
    this.afAuth.auth.createUserWithEmailAndPassword( user.email, user.password)
      .then( userCredential => {
        this.newUser = user;
        console.log(userCredential);
        userCredential.user.updateProfile( {
       
          displayName: user.firstName + ' ' + user.lastName,
          photoURL: user.role
        

        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch( error => {
        this.eventAuthError.next(error);
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: this.newUser.role,
    })
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  create_NewPlantilla (record){
    return this.db.collection('Plantillas').add(record);
  }
  read_Plantilla(){
    return this.db.collection('Plantillas').snapshotChanges();
  }
  update_Plantilla(recordID, record){
    this.db.doc('Plantillas/' + recordID).update(record);
  }
  delete_Plantilla(record_id){
    this.db.doc('Plantillas/' + record_id).delete();
  }




}
