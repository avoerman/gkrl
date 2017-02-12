import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RacedetailsComponent } from './racedetails/racedetails.component';
import { AddRaceComponent } from './add-race/add-race.component';
import { RaceImportComponent } from './race-import/race-import.component';
import { RacesService } from '../services/races.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { routing } from '../app.routing';
import { CovalentCoreModule } from '@covalent/core';

@NgModule({
    declarations: [
        RaceImportComponent,
        AddRaceComponent,
        RacedetailsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CovalentCoreModule,
        routing
    ],
    providers: [
        RacesService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RacesModule {
}
