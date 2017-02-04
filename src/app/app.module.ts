import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {ToastComponent} from './shared/toast/toast.component';
import {RacesComponent} from './races/races.component';
import {RacesService} from "./services/races.service";
import {NavigationComponent} from './navigation/navigation.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {LeaderboardService} from "./services/leaderboard.service";
import 'rxjs/Rx';
import { RacedetailsComponent } from './racedetails/racedetails.component';

const routing = RouterModule.forRoot([
  {path: '', component: LeaderboardComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'races', component: RacesComponent},
  {path: 'race-details/:raceNumber', component: RacedetailsComponent}
]);

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    RacesComponent,
    NavigationComponent,
    LeaderboardComponent,
    RacedetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ToastComponent,
    RacesService,
    LeaderboardService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule {
}
