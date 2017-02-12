import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { RacesService } from '../../services/races.service';

@Component({
    selector: 'app-race-import',
    templateUrl: 'race-import.component.html',
    styleUrls: ['race-import.component.css']
})
export class RaceImportComponent implements OnInit {
    addRaceDataForm: FormGroup;
    rawRaceData = new FormControl('', Validators.required);
    raceNumber = new FormControl('', Validators.required);

    constructor(private formBuilder: FormBuilder,
                private racesService: RacesService) {
    }

    ngOnInit() {
        this.addRaceDataForm = this.formBuilder.group({
            rawRaceData: this.rawRaceData,
            raceNumber: this.raceNumber
        })
    }

    addRaceData() {
        this.racesService.addRaceFromRawData(this.addRaceDataForm.value).subscribe(
            res => {
                let newRaceData = res.json();
                console.log(newRaceData);
                this.addRaceDataForm.reset();
            },
            error => console.log(error)
        );
    }

}
