import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RacedetailsComponent } from './racedetails.component';
import { routing } from '../../app.routing';
import { RacesService } from '../../services/races.service';
import { CovalentCoreModule } from '@covalent/core';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        RacedetailsComponent
    ],
    imports: [
        CovalentCoreModule,
        RouterModule
    ],
    providers: [
        RacesService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RaceDetailsModule {
}
