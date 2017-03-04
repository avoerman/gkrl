import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RacesService } from '../../services/races.service';

@Component({
    selector: 'app-racedetails',
    templateUrl: 'racedetails.component.html',
    styleUrls: ['racedetails.component.css']
})
export class RacedetailsComponent implements OnInit {

    raceNumber: string;
    raceStats: any = [];
    private sub: any;

    constructor(private route: ActivatedRoute, private racesService: RacesService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.raceNumber = params['raceNumber'];
            this.getRaceStats(this.raceNumber);
        });
    }

    getRaceStats(raceNumber) {
        this.racesService.getRaceDetails(raceNumber).subscribe(raceStats => {
            console.log(raceStats);
            this.raceStats = raceStats;
        });
    }

}
