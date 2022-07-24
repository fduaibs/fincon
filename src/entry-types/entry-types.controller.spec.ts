import { Test, TestingModule } from '@nestjs/testing';
import { EntryTypesController } from './entry-types.controller';
import { EntryTypesService } from './entry-types.service';

describe('EntryTypeController', () => {
  let controller: EntryTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryTypesController],
      providers: [EntryTypesService],
    }).compile();

    controller = module.get<EntryTypesController>(EntryTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
