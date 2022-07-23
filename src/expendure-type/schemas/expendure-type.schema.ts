import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExpendureTypeDocument = ExpendureType & Document;

@Schema({ timestamps: true })
export class ExpendureType {
  @Prop()
  name: string;
}

export const ExpendureTypeSchema = SchemaFactory.createForClass(ExpendureType);
