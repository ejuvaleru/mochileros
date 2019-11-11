import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunPage } from './fun.page';

describe('FunPage', () => {
  let component: FunPage;
  let fixture: ComponentFixture<FunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
