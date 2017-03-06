import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovalentCoreModule } from '@covalent/core';
import { RouterModule } from '@angular/router';
import { DriverDetailComponent } from './driver-detail.component';
import { DriverDetailService } from '../services/driver-detail.service';

@NgModule({
    declarations: [
        DriverDetailComponent
    ],
    providers: [
        DriverDetailService
    ],
    imports: [
        CommonModule,
        CovalentCoreModule,
        RouterModule
    ]
})
export class DriverDetailModule {
}
