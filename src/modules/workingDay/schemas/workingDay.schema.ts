import { Timestamps } from '@/types/timestamps.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WorkingDayDocument = WorkingDay & Timestamps;

@Schema({
  timestamps: true,
})
export class WorkingDay {
  @Prop({
    unique: true,
  })
  day: string;
}

export const WorkingDaySchema = SchemaFactory.createForClass(WorkingDay);
