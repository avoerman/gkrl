import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RacesService } from "../services/races.service";
import { AuthService } from '../services/auth-service.service';
import { TdLoadingService } from '@covalent/core';

@Component({
    selector: 'app-races',
    templateUrl: './races.component.html',
    styleUrls: ['races.component.scss'],
    providers: [AuthService]
})
export class RacesComponent implements OnInit, AfterViewInit {
    races: any = [];

    constructor(private racesService: RacesService, private authService: AuthService, private loadingService: TdLoadingService) {
    }

    ngOnInit() {
        this.getRaceSummary();
    }

    ngAfterViewInit() {
        this.loadingService.register('load');
    }

    getRaceSummary() {
        this.racesService.getRaceSummary().subscribe(races => {
            this.races = races;
            setTimeout(() => this.loadingService.resolve('load'), 500);
        });
    }

}
