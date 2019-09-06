import { Test, TestingModule } from '@nestjs/testing';
import { DripsService } from './drips.service';

describe('DripsService', () => {
  let service: DripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DripsService],
    }).compile();

    service = module.get<DripsService>(DripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
