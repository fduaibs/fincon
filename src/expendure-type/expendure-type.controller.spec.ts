import { Test, TestingModule } from '@nestjs/testing';
import { ExpendureTypeController } from './expendure-type.controller';
import { ExpendureTypeService } from './expendure-type.service';

describe('ExpendureTypeController', () => {
  let controller: ExpendureTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpendureTypeController],
      providers: [ExpendureTypeService],
    }).compile();

    controller = module.get<ExpendureTypeController>(ExpendureTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
