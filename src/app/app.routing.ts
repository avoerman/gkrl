import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RacesComponent } from './races/races.component';
import { AddRaceComponent } from './races/add-race/add-race.component';
import { RacedetailsComponent } from './races/racedetails/racedetails.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';

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
        path: 'races/:raceNumber',
        component: RacedetailsComponent
    }, {
        path: 'addrace',
        component: AddRaceComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'drivers/:id',
        component: DriverDetailComponent
    },
];

export const routing = RouterModule.forRoot(appRoutes);
