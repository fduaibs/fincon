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
import { ExpendureTypeService } from './expendure-type.service';
import { CreateExpendureTypeDto } from './dto/create-expendure-type.dto';
import { UpdateExpendureTypeDto } from './dto/update-expendure-type.dto';
import { ExpendureTypeDocument } from './schemas/expendure-type.schema';

@Controller('expendure-type')
@ApiTags('expendure-type')
export class ExpendureTypeController {
  constructor(private readonly expendureTypeService: ExpendureTypeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createExpendureTypeDto: CreateExpendureTypeDto,
  ): Promise<ExpendureTypeDocument> {
    return await this.expendureTypeService.create(createExpendureTypeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return await this.expendureTypeService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return await this.expendureTypeService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateExpendureTypeDto: UpdateExpendureTypeDto,
  ): Promise<void> {
    await this.expendureTypeService.update(id, updateExpendureTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.expendureTypeService.remove(id);
  }
}
