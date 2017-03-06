import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DriverDetailService {

    constructor(private http: Http) { }

    getDriverDetails(driverId) {
        return this.http.get('/api/drivers/' + driverId).map(res => res.json());
    }
}
