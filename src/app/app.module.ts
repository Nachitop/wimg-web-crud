import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MisMateriales} from '../app/AngularMaterial/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CrudguiaComponent } from './components/crudguia/crudguia.component';
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'; //hace que funcione el modal


const routes:Routes=[
  {path:'**',component:CrudguiaComponent},
  {path:'guias',component:CrudguiaComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrudguiaComponent, 
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule,FormsModule,ReactiveFormsModule, MisMateriales, RouterModule.forRoot(routes), HttpClientModule,NgbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
