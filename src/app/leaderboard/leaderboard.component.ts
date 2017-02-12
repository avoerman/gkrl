import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LeaderboardService } from "../services/leaderboard.service";
import { TdLoadingService } from '@covalent/core';
import { setTimeout } from 'timers';

@Component({
    selector: 'app-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit, AfterViewInit {

    leaderboardSummary: any = [];

    constructor(private leaderboardService: LeaderboardService,
                private _loadingService: TdLoadingService) {}

    ngOnInit() {
        this.getLeaderboardSummary();
    }

    ngAfterViewInit() {
        this._loadingService.register('load');
    }

    private getLeaderboardSummary() {
        this.leaderboardService.getLeaderboardSummary().subscribe(leaderboardSummary => {
            this.leaderboardSummary = leaderboardSummary;
            setTimeout(()=> this._loadingService.resolve('load'), 500);
        });
    }
}
