import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { EntryType } from '../../entry-types/schemas/entry-type.schema';

export type EntryDocument = Entry & Document;

@Schema({ timestamps: true })
export class Entry {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EntryType' })
  type: EntryType;

  @Prop()
  value: string;
}

export const EntrySchema = SchemaFactory.createForClass(EntryType);
