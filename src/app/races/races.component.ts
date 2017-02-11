import {Component, OnInit} from '@angular/core';
import {RacesService} from "../services/races.service";
import {AuthService} from '../services/auth-service.service';

@Component({
    selector: 'app-races',
    templateUrl: './races.component.html',
    styleUrls: ['races.component.scss'],
    providers: [AuthService]
})
export class RacesComponent implements OnInit {
    races: any = [];

    constructor(private racesService: RacesService, private authService: AuthService) {
    }

    ngOnInit() {
        this.getRaceSummary();
    }

    getRaceSummary() {
        this.racesService.getRaceSummary().subscribe(races => {
            this.races = races;
        });
    }
}
