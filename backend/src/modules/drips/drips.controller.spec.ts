import { Test, TestingModule } from '@nestjs/testing';
import { DripsController } from 'src/modules/drips/drips.controller';

describe('Drips Controller', () => {
  let controller: DripsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DripsController],
    }).compile();

    controller = module.get<DripsController>(DripsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
