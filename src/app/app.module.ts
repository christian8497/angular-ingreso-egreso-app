import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { SidebarComponent } from './modules/shared/sidebar/sidebar.component';
import { FooterComponent } from './modules/shared/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { IngresoEgresoComponent } from './modules/ingreso-egreso/ingreso-egreso.component';
import { DetalleComponent } from './modules/ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from './modules/ingreso-egreso/estadistica/estadistica.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

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
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
