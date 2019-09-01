import { TestBed } from '@angular/core/testing';

import { DripsService } from './drips.service';

describe('DripsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DripsService = TestBed.get(DripsService);
    expect(service).toBeTruthy();
  });
});
