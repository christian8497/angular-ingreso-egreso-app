import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../shared/reducers/app.reducer';
import * as uiActions from '../../../shared/actions/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
    })

    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => {
        this.cargando = ui.isLoading
        // console.log('cargando');

      });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  loginUsuario(): void {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch( uiActions.isLoading() );

    /*
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    */

    this.authService.iniciarSesion( this.loginForm.value )
      .then( credenciales => {
        // console.log(credenciales);
        // Swal.close();
        this.store.dispatch( uiActions.stopLoading() );

        this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch( uiActions.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      });
  }

}
