import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateExpendureTypeDto } from './dto/create-expendure-type.dto';
import { UpdateExpendureTypeDto } from './dto/update-expendure-type.dto';
import {
  ExpendureType,
  ExpendureTypeDocument,
} from './schemas/expendure-type.schema';

@Injectable()
export class ExpendureTypeService {
  constructor(
    @InjectModel(ExpendureType.name)
    private readonly expendureTypeModel: Model<ExpendureType>,
  ) {}
  async create(
    createExpendureTypeDto: CreateExpendureTypeDto,
  ): Promise<ExpendureTypeDocument> {
    const createdExpendureType = new this.expendureTypeModel(
      createExpendureTypeDto,
    );
    const savedExpendureType = await createdExpendureType.save();
    return savedExpendureType;
  }

  async findAll(): Promise<ExpendureTypeDocument[]> {
    const foundExpendureTypeList = await this.expendureTypeModel.find({});
    return foundExpendureTypeList;
  }

  async findOne(id: string): Promise<ExpendureTypeDocument> {
    const foundExpendureType = await this.expendureTypeModel.findById(id);
    return foundExpendureType;
  }

  async update(id: string, updateExpendureTypeDto: UpdateExpendureTypeDto) {
    const updatedExpendureType = await this.expendureTypeModel.updateOne(
      { _id: id },
      updateExpendureTypeDto,
    );

    return updatedExpendureType;
  }

  async remove(id: string) {
    const removedExpendureType = await this.expendureTypeModel.deleteOne({
      _id: id,
    });
    return removedExpendureType;
  }
}
