import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class LeaderboardService {

  constructor(private http: Http) {
  }

  getLeaderboardSummary() {
    return this.http.get('/api/leaderboardsummary').map(res => res.json());
  }
}
