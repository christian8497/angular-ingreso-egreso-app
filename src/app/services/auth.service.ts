import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../shared/reducers/app.reducer';
import * as authActions from '../shared/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(
    public auth:AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>,
  ) { }

  initAuthListener() {

    this.auth.authState.subscribe( firebaseUser => {

      if ( firebaseUser ) {

        this.userSubscription = this.firestore.doc(`${ firebaseUser.uid}/usuario`).valueChanges()
          .subscribe( firestoreUser => {
            // console.log(firestoreUser);
            const user = Usuario.fromFirebase(firestoreUser);
            this.store.dispatch(authActions.setUser({ user: user }));
          });

      } else {
        if (this.userSubscription != null) {
          this.userSubscription.unsubscribe();
        }
        this.store.dispatch( authActions.unSetUser());
      }
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
