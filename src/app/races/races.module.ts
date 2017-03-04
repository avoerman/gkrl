import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacesService } from '../services/races.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing } from '../app.routing';
import { CovalentCoreModule } from '@covalent/core';
import { RaceDetailsModule } from './racedetails/racedetails.module';
import { AddRaceModule } from './add-race/add-race.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CovalentCoreModule,
        RaceDetailsModule,
        AddRaceModule,
        RouterModule
    ],
    providers: [
        RacesService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RacesModule {
}
