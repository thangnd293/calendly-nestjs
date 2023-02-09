import { Shift } from '@/modules/shift/schemas/shift.schema';
import { Timestamps } from '@/types/timestamps.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type WorkingDayDocument = WorkingDay & Timestamps;

@Schema({
  timestamps: true,
})
export class WorkingDay {
  @Prop()
  day: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
  })
  shifts: [Shift];
}

export const WorkingDaySchema = SchemaFactory.createForClass(WorkingDay);
