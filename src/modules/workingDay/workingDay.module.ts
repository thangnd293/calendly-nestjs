import { WorkingDay, WorkingDaySchema } from './schemas/workingDay.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingDayService } from './workingDay.service';
import { WorkingDayController } from './workingDay.controller';
import { Shift, ShiftSchema } from '@/modules/shift/schemas/shift.schema';
import {
  Reservation,
  ReservationSchema,
} from '../reservation/schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: WorkingDay.name,
        schema: WorkingDaySchema,
      },
    ]),
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
  controllers: [WorkingDayController],
  providers: [WorkingDayService],
})
export class WorkingDayModule {}
