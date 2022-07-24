import { Test, TestingModule } from '@nestjs/testing';
import { EntryTypesService } from './entry-types.service';

describe('EntryTypesService', () => {
  let service: EntryTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntryTypesService],
    }).compile();

    service = module.get<EntryTypesService>(EntryTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
