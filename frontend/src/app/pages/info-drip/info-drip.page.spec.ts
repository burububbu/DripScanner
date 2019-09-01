import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDripPage } from './info-drip.page';

describe('InfoDripPage', () => {
  let component: InfoDripPage;
  let fixture: ComponentFixture<InfoDripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
