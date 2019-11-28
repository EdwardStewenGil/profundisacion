import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  id1="IfQLkisuXED3t8KYVb7";
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
  read_Plantilla1(nameplantilla){
    return this.db.collection('Plantillas' , ref  =>  ref . where ( 'Name' , '==' , nameplantilla )).snapshotChanges()
  }

  update_Plantilla(recordID, record){
    this.db.doc('Plantillas/' + recordID).update(record);
  }
  delete_Plantilla(record_id){
    this.db.doc('Plantillas/' + record_id).delete();
  }






  read_Criterios_ID(id){
    return this.db.collection('Criterios/' + id).snapshotChanges();
  }



  create_NewCriterios(record){
    return this.db.collection('Criterios').add(record);
  }
  read_Criterios(id_plantilla2){
    return this.db.collection('Criterios' , ref  =>  ref . where ( 'Plantilla' , '==' , id_plantilla2 )).snapshotChanges()
    }
  update_Criterios(recordID, record){
    this.db.doc('Criterios/' + recordID).update(record);
  }
  delete_Criterios(record_id){
    this.db.doc('Criterios/' + record_id).delete();
  }


  create_NewEvaluador(record){
    return this.db.collection('Evaluador').add(record);
  }
  read_Evaluador(){
    return this.db.collection('Evaluador').snapshotChanges()
    }
  update_Evaluador(recordID, record){
    this.db.doc('Evaluador/' + recordID).update(record);
  }
  delete_Evaluador(record_id){
    this.db.doc('Evaluador/' + record_id).delete();
  }



    create_Obs(record){
    return this.db.collection('Observacion').add(record);
  }

  read_Obs(idlista){
    return this.db.collection('Observacion' , ref  =>  ref . where ( 'idlista' , '==' , idlista )).snapshotChanges()
    }

    read_Obs1(){
      return this.db.collection('Observacion' ).snapshotChanges()
      }

  update_Obs(recordID, record){
    this.db.doc('Observacion/' + recordID).update(record);
  }

  delete_Obs(record_id){
    this.db.doc('Observacion/' + record_id).delete();
  }






}
