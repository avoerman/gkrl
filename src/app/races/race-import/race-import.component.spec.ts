/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RaceImportComponent } from './race-import.component';

describe('RaceImportComponent', () => {
  let component: RaceImportComponent;
  let fixture: ComponentFixture<RaceImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
