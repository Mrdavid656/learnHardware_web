import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import es from '@angular/common/locales/es';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {PrincipalComponent} from "./pages/principal/principal.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzRateModule} from "ng-zorro-antd/rate";
import {LeccionesComponent} from "./pages/lecciones/lecciones.component";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzCarouselModule} from "ng-zorro-antd/carousel";
import {MatDialogModule} from "@angular/material/dialog";
import {PreguntasComponent} from "./dialogs/preguntas/preguntas.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {NzModalModule} from "ng-zorro-antd/modal";
import {LoginComponent} from "./core/auth/login/login.component";
import {RegisterComponent} from "./core/auth/register/register.component";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {PerfilComponent} from "./pages/perfil/perfil.component";
import {NzListModule} from "ng-zorro-antd/list";

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DashboardComponent,
    LeccionesComponent,
    PreguntasComponent,
    LoginComponent,
    RegisterComponent,
    PerfilComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzCollapseModule,
        NzWaveModule,
        NzButtonModule,
        NzRateModule,
        NzCardModule,
        NzCarouselModule,
        MatDialogModule,
        MatGridListModule,
        NzModalModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        NzListModule
    ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
