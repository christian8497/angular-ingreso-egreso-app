import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// angular fire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// routing
import { AppRoutingModule } from './app-routing.module';


// pipes
import { SiNoPipe } from './pipes/Si-No/si-no.pipe';

// environments
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { SidebarComponent } from './modules/shared/sidebar/sidebar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { IngresoEgresoComponent } from './modules/ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './modules/ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './modules/ingreso-egreso/estadistica/estadistica.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,EstadisticaComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    SiNoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
