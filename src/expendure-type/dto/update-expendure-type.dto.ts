import { PartialType } from '@nestjs/swagger';
import { CreateExpendureTypeDto } from './create-expendure-type.dto';

export class UpdateExpendureTypeDto extends PartialType(
  CreateExpendureTypeDto,
) {}
