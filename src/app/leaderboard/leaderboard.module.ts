import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderboardComponent } from './leaderboard.component';
import { routing } from '../app.routing';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
    declarations: [
        LeaderboardComponent
    ],
    imports: [
        CommonModule,
        CovalentCoreModule,
        routing
    ]
})
export class LeaderboardModule {
}
