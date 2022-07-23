import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpendureTypeService } from './expendure-type.service';
import { ExpendureTypeController } from './expendure-type.controller';
import {
  ExpendureType,
  ExpendureTypeSchema,
} from './schemas/expendure-type.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExpendureType.name, schema: ExpendureTypeSchema },
    ]),
  ],
  controllers: [ExpendureTypeController],
  providers: [ExpendureTypeService],
})
export class ExpendureTypeModule {}
