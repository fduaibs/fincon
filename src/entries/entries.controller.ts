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
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { EntryDocument } from './schemas/entry.schema';

@Controller('entries')
@ApiTags('Entries Controller')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEntryDto: CreateEntryDto): Promise<EntryDocument> {
    return await this.entriesService.create(createEntryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<EntryDocument[]> {
    return await this.entriesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<EntryDocument> {
    return await this.entriesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ): Promise<void> {
    await this.entriesService.update(id, updateEntryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.entriesService.remove(id);
  }
}
