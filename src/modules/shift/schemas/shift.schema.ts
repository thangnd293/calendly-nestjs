import { WorkingDay } from '@/modules/workingDay/schemas/workingDay.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Timestamps } from '@/types/timestamps.type';

export type ShiftDocument = Shift & Timestamps;
@Schema({
  timestamps: true,
})
export class Shift {
  @Prop()
  startTime: string;

  @Prop()
  endTime: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkingDay',
  })
  workingDay: WorkingDay;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
