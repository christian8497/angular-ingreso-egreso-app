import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {
    path:'',
    component: DashboardComponent,
    children: dashboardRoutes,
    canActivate: [ AuthGuard ]
  },
  {path:'**', redirectTo: ''}
];

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class AppRoutingModule {}
