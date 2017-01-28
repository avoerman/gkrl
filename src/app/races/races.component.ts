import {Component, OnInit} from '@angular/core';
import {RacesService} from "../services/races.service";

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  races: any = [];

  constructor(private racesService: RacesService) {
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
