import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamps } from '@/types/timestamps.type';
import mongoose from 'mongoose';
import { Shift } from '@/modules/shift/schemas/shift.schema';

export type ReservationDocument = Reservation | Timestamps;
@Schema({
  timestamps: true,
})
export class Reservation {
  @Prop()
  user: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shift' })
  shift: Shift;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
