import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public auth:AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuthListener() {
    this.auth.authState.subscribe( firebaseUser => {
      /*
      console.log(firebaseUser);
      console.log(firebaseUser?.uid);
      console.log(firebaseUser?.email);
      */
    })
  }

  crearUsuario(usuario: any) {
    const { nombre, correo, password } = usuario;
    return this.auth.createUserWithEmailAndPassword( correo, password )
      .then( fbUser => {
        const {uid, email }:any = fbUser.user;
        const newUser = new Usuario( uid, nombre, email);
        return this.firestore.doc(`${uid}/usuario`)
          .set({...newUser});
      })
  }

  iniciarSesion( usuario: any ) {
    const { correo, password } = usuario;
    return this.auth.signInWithEmailAndPassword( correo, password );
  }

  cerrarSesion() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map( fbUser => fbUser != null)  // si existe retorna true - false
    );
  }

}
