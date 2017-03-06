/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverDetailService } from './driver-detail.service';

describe('DriverDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverDetailService]
    });
  });

  it('should ...', inject([DriverDetailService], (service: DriverDetailService) => {
    expect(service).toBeTruthy();
  }));
});
