import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routing } from '../../app.routing';
import { RacesService } from '../../services/races.service';
import { CovalentCoreModule } from '@covalent/core';
import { AddRaceComponent } from './add-race.component';
import { RaceImportComponent } from '../race-import/race-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AddRaceComponent,
        RaceImportComponent
    ],
    imports: [
        CommonModule,
        CovalentCoreModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    providers: [
        RacesService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AddRaceModule {
}
