import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PrincipalComponent} from "./pages/principal/principal.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LeccionesComponent} from "./pages/lecciones/lecciones.component";
import {LoginComponent} from "./core/auth/login/login.component";
import { RegisterComponent } from './core/auth/register/register.component';
import {AuthGuard} from "./core/guards/auth.guard";
import {PerfilComponent} from "./pages/perfil/perfil.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegisterComponent,
  },
  {
    path: '',
    component: PrincipalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'leccion', component: LeccionesComponent },
      { path: 'perfil', component: PerfilComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
