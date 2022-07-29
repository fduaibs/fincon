import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntryTypesService } from './entry-types.service';
import { CreateEntryTypeDto } from './dto/create-entry-type.dto';
import { UpdateEntryTypeDto } from './dto/update-entry-type.dto';
import { EntryTypeDocument } from './schemas/entry-type.schema';

@Controller('entry-types')
@ApiTags('Entry Types Controller')
export class EntryTypesController {
  constructor(private readonly entryTypeService: EntryTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEntryTypeDto: CreateEntryTypeDto,
  ): Promise<EntryTypeDocument> {
    return await this.entryTypeService.create(createEntryTypeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<EntryTypeDocument[]> {
    return await this.entryTypeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<EntryTypeDocument> {
    return await this.entryTypeService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateEntryTypeDto: UpdateEntryTypeDto,
  ): Promise<void> {
    await this.entryTypeService.update(id, updateEntryTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.entryTypeService.remove(id);
  }
}
