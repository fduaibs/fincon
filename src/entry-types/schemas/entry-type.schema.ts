import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EntryTypeDocument = EntryType & Document;

@Schema({ timestamps: true })
export class EntryType {
  @Prop()
  name: string;
}

export const EntryTypeSchema = SchemaFactory.createForClass(EntryType);
