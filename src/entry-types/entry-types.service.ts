import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { CreateEntryTypeDto } from './dto/create-entry-type.dto';
import { UpdateEntryTypeDto } from './dto/update-entry-type.dto';
import { EntryType, EntryTypeDocument } from './schemas/entry-type.schema';

@Injectable()
export class EntryTypesService {
  constructor(
    @InjectModel(EntryType.name)
    private readonly entryTypeModel: Model<EntryType>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}
  async create(
    createEntryTypeDto: CreateEntryTypeDto,
  ): Promise<EntryTypeDocument> {
    const createdEntryType = new this.entryTypeModel(createEntryTypeDto);
    const savedEntryType = await createdEntryType.save();
    await this.cacheManager.del('Fincon-EntryTypeList');
    return savedEntryType;
  }

  async findAll(): Promise<EntryTypeDocument[]> {
    const cachedEntryTypeList: EntryTypeDocument[] =
      await this.cacheManager.get('Fincon-EntryTypeList');

    if (!cachedEntryTypeList) {
      const foundEntryTypeList = await this.entryTypeModel.find({});
      await this.cacheManager.set('Fincon-EntryTypeList', foundEntryTypeList);

      return foundEntryTypeList;
    }

    return cachedEntryTypeList;
  }

  async findOne(id: string): Promise<EntryTypeDocument> {
    const cachedEntryTypeList: EntryTypeDocument[] =
      await this.cacheManager.get('Fincon-EntryTypeList');

    if (!cachedEntryTypeList) {
      const foundEntryType = await this.entryTypeModel.findById(id);
      return foundEntryType;
    }

    const entryTypeFound = cachedEntryTypeList.find(
      (entryType) => entryType._id === id,
    );

    if (!entryTypeFound) throw new NotFoundException();

    return entryTypeFound;
  }

  async update(id: string, updateEntryTypeDto: UpdateEntryTypeDto) {
    const updatedEntryType = await this.entryTypeModel.updateOne(
      { _id: id },
      updateEntryTypeDto,
    );

    await this.cacheManager.del('Fincon-EntryTypeList');

    return updatedEntryType;
  }

  async remove(id: string) {
    const removedEntryType = await this.entryTypeModel.deleteOne({
      _id: id,
    });

    await this.cacheManager.del('Fincon-EntryTypeList');

    return removedEntryType;
  }
}
