import {Component, OnInit} from '@angular/core';
import {LeaderboardService} from "../services/leaderboard.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  leaderboardSummary: any = [];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.getLeaderboardSummary();
  }

  private getLeaderboardSummary() {
    this.leaderboardService.getLeaderboardSummary().subscribe(leaderboardSummary => {
      this.leaderboardSummary = leaderboardSummary;
    });
  }
}
