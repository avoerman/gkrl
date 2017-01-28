import {Injectable} from '@angular/core';
import {Http} from "@angular/http";

@Injectable()
export class RacesService {

  constructor(private http: Http) {}

  getRaceSummary() {
    return this.http.get('/api/racesummary').map(res => res.json());
  }

}
