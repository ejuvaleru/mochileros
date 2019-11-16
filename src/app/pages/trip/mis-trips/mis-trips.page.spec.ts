import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisTripsPage } from './mis-trips.page';

describe('MisTripsPage', () => {
  let component: MisTripsPage;
  let fixture: ComponentFixture<MisTripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisTripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisTripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
