import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntryTypesService } from './entry-types.service';
import { EntryTypesController } from './entry-types.controller';
import { EntryType, EntryTypeSchema } from './schemas/entry-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EntryType.name, schema: EntryTypeSchema },
    ]),
  ],
  controllers: [EntryTypesController],
  providers: [EntryTypesService],
})
export class EntryTypesModule {}
