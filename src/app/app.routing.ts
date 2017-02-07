import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './services/auth-guard.service';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {RacesComponent} from './races/races.component';
import {AddRaceComponent} from './add-race/add-race.component';
import {RacedetailsComponent} from './racedetails/racedetails.component';

const appRoutes: Routes = [
    {
        path: '',
        component: LeaderboardComponent,
        //redirectTo: '/leaderboard' //auth0 will not work like this, for now
    }, {
        path: 'leaderboard',
        component: LeaderboardComponent
    }, {
        path: 'races',
        component: RacesComponent
    }, {
        path: 'race-details/:raceNumber',
        component: RacedetailsComponent
    }, {
        path: 'races/add',
        component: AddRaceComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forRoot(appRoutes);
