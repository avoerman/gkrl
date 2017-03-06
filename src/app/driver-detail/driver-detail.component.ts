import { Component, OnInit } from '@angular/core';
import { DriverDetailService } from '../services/driver-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-driver-detail',
    templateUrl: './driver-detail.component.html',
    styleUrls: ['./driver-detail.component.scss']
})
export class DriverDetailComponent implements OnInit {

    constructor(private driverDetailService: DriverDetailService, private route: ActivatedRoute) { }

    public driverDetails: any = {};

    ngOnInit() {

        this.route.params.subscribe(params => {
            this.driverDetailService.getDriverDetails(params['id']).subscribe((res) => {
                this.driverDetails = res;
                console.log(res);
            });
        });

    }

}
