import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Reservation {
  @Prop()
  startTime: Date;

  @Prop()
  isMuted: boolean;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
