/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RacesService } from './races.service';

describe('RacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RacesService]
    });
  });

  it('should ...', inject([RacesService], (service: RacesService) => {
    expect(service).toBeTruthy();
  }));
});
