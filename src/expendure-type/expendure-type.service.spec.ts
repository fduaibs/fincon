import { Test, TestingModule } from '@nestjs/testing';
import { ExpendureTypeService } from './expendure-type.service';

describe('ExpendureTypeService', () => {
  let service: ExpendureTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpendureTypeService],
    }).compile();

    service = module.get<ExpendureTypeService>(ExpendureTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
