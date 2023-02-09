import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Reservation } from 'src/modules/reservation/schemas/reservation.schema';

@Schema({
  timestamps: true,
})
export class Shift {
  @Prop()
  user: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' },
  })
  reservation: Reservation;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);
