import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class RacesService {

  constructor(private http: Http) {}

  getRaceSummary() {
    return this.http.get('/api/races').map(res => res.json());
  }

  getRaceDetails(raceNumber) {
    return this.http.get('/api/race/'+raceNumber).map(res => res.json());
  }

}
