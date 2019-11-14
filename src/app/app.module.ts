import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HiderComponent } from './hider/hider.component';
import { ListaComponent } from './lista/lista.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { CentroComponent } from './centro/centro.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ChequeoComponent } from './chequeo/chequeo.component';
import { FinalesComponent } from './finales/finales.component';
import { InicioComponent } from './inicio/inicio.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { EvaluadorComponent } from './evaluador/evaluador.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { PlantillasComponent } from './plantillas/plantillas.component';
import { ReportesComponent } from './reportes/reportes.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AppComponent,
    HiderComponent,
    ListaComponent,
    CentroComponent,
    ChequeoComponent,
    FinalesComponent,
    InicioComponent,
    AdministradorComponent,
    EvaluadorComponent,
    TrabajadorComponent,
    UsuarioComponent,
    PlantillasComponent,
    ReportesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp( environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
