import { PartialType } from '@nestjs/swagger';
import { CreateEntryTypeDto } from './create-entry-type.dto';

export class UpdateEntryTypeDto extends PartialType(CreateEntryTypeDto) {}
