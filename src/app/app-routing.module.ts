import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { InicioComponent } from './inicio/inicio.component';
import { HiderComponent } from './hider/hider.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EvaluadorComponent } from './evaluador/evaluador.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { CriteriosComponent } from './criterios/criterios.component';
import { CentroComponent } from './centro/centro.component';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'Administrador',
    component: CentroComponent
  },
  {
    path: 'criterio',
    component: CriteriosComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'criterios',
    component: CriteriosComponent

  },
  {
    path: 'administrador',
    component: AdministradorComponent
  },
  {
    path: 'evaluador',
    component: EvaluadorComponent
  },
  {
    path: 'trabajador',
    component: TrabajadorComponent
  },

  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'hider',
    component: HiderComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
