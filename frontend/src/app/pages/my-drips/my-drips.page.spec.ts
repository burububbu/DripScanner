import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDripsPage } from './my-drips.page';

describe('MyDripsPage', () => {
  let component: MyDripsPage;
  let fixture: ComponentFixture<MyDripsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDripsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDripsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
