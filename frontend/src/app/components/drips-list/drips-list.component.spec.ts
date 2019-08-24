import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DripsListComponent } from './drips-list.component';

describe('DripsListComponent', () => {
  let component: DripsListComponent;
  let fixture: ComponentFixture<DripsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DripsListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DripsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
