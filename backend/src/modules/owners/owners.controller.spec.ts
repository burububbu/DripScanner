import { Test, TestingModule } from '@nestjs/testing';
import { OwnersController } from './owners.controller';

describe('Owners Controller', () => {
  let controller: OwnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnersController],
    }).compile();

    controller = module.get<OwnersController>(OwnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
