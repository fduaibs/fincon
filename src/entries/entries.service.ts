import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Cache } from 'cache-manager';
import { Model } from 'mongoose';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry, EntryDocument } from './schemas/entry.schema';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel(Entry.name)
    private readonly entryModel: Model<EntryDocument>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  entryListCacheTag = this.configService.get<string>('CACHED_ENTRY_LIST');

  async create(createEntryDto: CreateEntryDto): Promise<EntryDocument> {
    const createdEntry = new this.entryModel(createEntryDto);
    const savedEntry = await createdEntry.save();
    await this.cacheManager.del(this.entryListCacheTag);
    return savedEntry;
  }

  async findAll(): Promise<EntryDocument[]> {
    const cachedEntryList: EntryDocument[] = await this.cacheManager.get(
      this.entryListCacheTag,
    );

    if (!cachedEntryList) {
      const foundEntryList = await this.entryModel.find({}).populate('type');
      await this.cacheManager.set(this.entryListCacheTag, foundEntryList);

      return foundEntryList;
    }

    return cachedEntryList;
  }

  async findOne(id: string): Promise<EntryDocument> {
    const cachedEntryList: EntryDocument[] = await this.cacheManager.get(
      this.entryListCacheTag,
    );

    if (!cachedEntryList) {
      const foundEntry = await this.entryModel.findById(id).populate('type');

      return foundEntry;
    }

    const entryFound = cachedEntryList.find(
      (entryType) => entryType._id === id,
    );

    if (!entryFound) throw new NotFoundException();

    return entryFound;
  }

  async update(id: string, updateEntryDto: UpdateEntryDto) {
    const updatedEntry = await this.entryModel.updateOne(
      { _id: id },
      updateEntryDto,
    );

    await this.cacheManager.del(this.entryListCacheTag);

    return updatedEntry;
  }

  async remove(id: string) {
    const removedEntry = await this.entryModel.deleteOne({
      _id: id,
    });

    await this.cacheManager.del(this.entryListCacheTag);

    return removedEntry;
  }
}
