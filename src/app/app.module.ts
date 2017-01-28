import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {DataService} from './services/data.service';

import {ToastComponent} from './shared/toast/toast.component';
import { RacesComponent } from './races/races.component';
import {RacesService} from "./services/races.service";

const routing = RouterModule.forRoot([
  {path: '', component: RacesComponent},
  {path: 'races', component: RacesComponent}

]);

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    RacesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService,
    ToastComponent,
    RacesService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
