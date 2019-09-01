import { TestBed } from '@angular/core/testing';

import { OwnersService } from './owners.service';

describe('OwnersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OwnersService = TestBed.get(OwnersService);
    expect(service).toBeTruthy();
  });
});
