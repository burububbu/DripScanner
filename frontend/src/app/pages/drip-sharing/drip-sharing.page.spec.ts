import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DripSharingPage } from './drip-sharing.page';

describe('DripSharingPage', () => {
  let component: DripSharingPage;
  let fixture: ComponentFixture<DripSharingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DripSharingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DripSharingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
