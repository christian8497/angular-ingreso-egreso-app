import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';
import { AppState } from '../../../shared/reducers/app.reducer';
import * as uiActions from '../../../shared/actions/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm!: FormGroup;
  registrando: boolean = true;
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
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

  crearUsuario(): void {
    if (this.registroForm.invalid) { return; }

    this.store.dispatch( uiActions.isLoading() );

    /*
    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });
    */

    this.authService.crearUsuario( this.registroForm.value )
      .then( credenciales => {
        this.store.dispatch( uiActions.stopLoading() );
        /*
        Swal.close();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario Creado',
          showConfirmButton: false,
          timer: 1500
        })
        */
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
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
