import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      correo: ['', [ Validators.required, Validators.email ]],
      password: ['', Validators.required],
    })
  }

  loginUsuario(): void {
    if (this.loginForm.invalid) { return; }

    Swal.fire({
      title: 'Espere por favor',
      didOpen: () => {
        Swal.showLoading()
      }
    });

    this.authService.iniciarSesion( this.loginForm.value )
      .then( credenciales => {
        // console.log(credenciales);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch( error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message,
        })
      });
  }

}
