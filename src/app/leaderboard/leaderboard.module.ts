import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { CovalentCoreModule } from '@covalent/core';
import { RouterModule } from '@angular/router';
import { DriverDetailModule } from '../driver-detail/driver-detail.module';

@NgModule({
    declarations: [
        LeaderboardComponent
    ],
    imports: [
        CommonModule,
        DriverDetailModule,
        CovalentCoreModule,
        RouterModule
    ]
})
export class LeaderboardModule {
}
