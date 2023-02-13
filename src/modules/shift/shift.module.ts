import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shift, ShiftSchema } from '@/modules/shift/schemas/shift.schema';
import { ShiftController } from './shift.controller';
import { ShiftService } from './shift.service';
import {
  Reservation,
  ReservationSchema,
} from '../reservation/schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Shift.name,
        schema: ShiftSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  controllers: [ShiftController],
  providers: [ShiftService],
})
export class ShiftModule {}
